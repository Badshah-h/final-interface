/**
 * Mock data for API services
 *
 * This file is kept as a reference for other modules that might need similar mock data structure.
 * User management specific mock data has been moved to the user management module.
 */
import { PaginatedResponse, PaginationMeta } from "../types";

// Helper to create paginated responses
export function createPaginatedResponse<T>(
  data: T[],
  page: number = 1,
  perPage: number = 10,
): PaginatedResponse<T> {
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const paginatedData = data.slice(start, end);

  const meta: PaginationMeta = {
    current_page: page,
    from: start + 1,
    last_page: Math.ceil(data.length / perPage),
    path: "",
    per_page: perPage,
    to: Math.min(end, data.length),
    total: data.length,
  };

  return {
    data: paginatedData,
    meta,
  };
}
