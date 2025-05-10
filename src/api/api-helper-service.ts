import { ApiGatewayService } from "./api-gateway-service";

const ANIME_API = {
  getAnimeById: { path: (id: number) => `/anime/${id}/full` },
  searchAnime: { path: "/anime" },
  topAnime: { path: "/top/anime" },
};

export class ApiHelperService {
  /**
   * Get anime by ID
   * @param id Anime MAL ID
   */
  static async getAnimeById(id: number) {
    const path = ANIME_API.getAnimeById.path(id);
    return ApiGatewayService.get({ path });
  }

  static async getAllAnime(
    params: {
      title_english?: string;
      page?: number;
      limit?: number;
      type?: string;
      status?: string;
      genres?: string;
      sort?: string;
    } = {}
  ) {
    const {
      title_english = null,
      page = 1,
      limit = 24,
      type = null,
      status = null,
      genres = null,
      sort = null,
    } = params;

    // Build query parameters
    const queryParams = new URLSearchParams();

    if (title_english) queryParams.append("q", title_english);
    if (page) queryParams.append("page", page.toString());
    if (limit) queryParams.append("limit", limit.toString());
    if (type) queryParams.append("type", type);
    if (status) queryParams.append("status", status);
    if (genres) queryParams.append("genres", genres);
    if (sort) queryParams.append("sort", sort);

    const endpoint = title_english
      ? ANIME_API.searchAnime.path
      : ANIME_API.topAnime.path;
    const path = `${endpoint}?${queryParams.toString()}`;

    const response = await ApiGatewayService.get({ path });
    return response;
  }

  /**
   * Search anime by query
   * @param query Search term
   * @param page Pagination (1-25)
   */
  static async searchAnime(query: string, page = 1) {
    return ApiGatewayService.get(ANIME_API.searchAnime, {
      queryStringParameters: { q: query, page },
    });
  }
}
