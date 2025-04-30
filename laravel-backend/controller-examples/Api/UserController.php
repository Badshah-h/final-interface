<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\UserStoreRequest;
use App\Http\Requests\Api\UserUpdateRequest;
use App\Http\Resources\UserResource;
use App\Http\Resources\ActivityLogResource;
use App\Models\User;
use App\Models\ActivityLog;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;

class UserController extends Controller
{
    protected $userRepository;

    /**
     * Create a new controller instance.
     *
     * @param  \App\Repositories\UserRepository  $userRepository
     * @return void
     */
    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
        $this->middleware('permission:view_users')->only(['index', 'show']);
        $this->middleware('permission:create_users')->only(['store']);
        $this->middleware('permission:edit_users')->only(['update']);
        $this->middleware('permission:delete_users')->only(['destroy']);
    }

    /**
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index(Request $request)
    {
        $users = $this->userRepository->getAllWithPagination(
            $request->per_page ?? 10,
            $request->search,
            $request->role,
            $request->status,
            $request->sort_by,
            $request->sort_direction
        );

        return UserResource::collection($users);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\Api\UserStoreRequest  $request
     * @return \App\Http\Resources\UserResource
     */
    public function store(UserStoreRequest $request)
    {
        $user = $this->userRepository->create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password ?? str_random(10)),
            'status' => $request->status ?? 'active',
        ]);

        if ($request->role) {
            $user->assignRole($request->role);
        }

        // Send welcome email if requested
        if ($request->send_email) {
            // Send email logic here
        }

        // Log the activity
        ActivityLog::log('Created user', $user->email);

        return new UserResource($user);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \App\Http\Resources\UserResource
     */
    public function show($id)
    {
        $user = $this->userRepository->findOrFail($id);
        $user->load('roles', 'permissions');

        return new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\Api\UserUpdateRequest  $request
     * @param  int  $id
     * @return \App\Http\Resources\UserResource
     */
    public function update(UserUpdateRequest $request, $id)
    {
        $user = $this->userRepository->findOrFail($id);

        $data = $request->only(['name', 'email', 'status']);
        
        if ($request->filled('password')) {
            $data['password'] = Hash::make($request->password);
        }

        $this->userRepository->update($user, $data);

        if ($request->filled('role')) {
            $user->syncRoles([$request->role]);
        }

        // Log the activity
        ActivityLog::log('Updated user', $user->email);

        return new UserResource($user->fresh(['roles', 'permissions']));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $user = $this->userRepository->findOrFail($id);
        $email = $user->email;

        $this->userRepository->delete($user);

        // Log the activity
        ActivityLog::log('Deleted user', $email);

        return response()->json([
            'message' => 'User deleted successfully',
        ]);
    }

    /**
     * Update the user's status.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \App\Http\Resources\UserResource
     */
    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:active,inactive,pending',
        ]);

        $user = $this->userRepository->findOrFail($id);
        $this->userRepository->update($user, ['status' => $request->status]);

        // Log the activity
        ActivityLog::log('Updated user status', $user->email, ['status' => $request->status]);

        return new UserResource($user);
    }

    /**
     * Send a password reset link to the user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function sendPasswordReset(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json([
                'message' => 'User not found',
            ], 404);
        }

        $status = Password::sendResetLink($request->only('email'));

        if ($status === Password::RESET_LINK_SENT) {
            // Log the activity
            ActivityLog::log('Sent password reset', $request->email);

            return response()->json([
                'message' => 'Password reset email sent successfully',
            ]);
        }

        return response()->json([
            'message' => 'Unable to send password reset email',
        ], 500);
    }

    /**
     * Get the user's permissions.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function permissions($id)
    {
        $user = $this->userRepository->findOrFail($id);
        $permissions = $user->getAllPermissions()->pluck('name');

        return response()->json([
            'data' => $permissions,
        ]);
    }

    /**
     * Get the user's activity logs.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function activityLogs(Request $request, $id)
    {
        $user = $this->userRepository->findOrFail($id);
        $logs = $user->activityLogs()
            ->orderBy('created_at', 'desc')
            ->paginate($request->per_page ?? 10);

        return ActivityLogResource::collection($logs);
    }
}
