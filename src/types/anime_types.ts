export interface AnimeCardProps {
  anime: {
    mal_id: number;
    title: string;
    images: {
      jpg: {
        image_url: string;
      };
    };
  };
}

export interface AnimeDetailsCardProps extends AnimeCardProps {
  anime: AnimeCardProps["anime"] & {
    title_english?: string;
    synopsis?: string;
    score?: number;
    ranked?: number;
    scored_by?: number;
    popularity?: number;
    members?: number;
    rank?: number;
    images: {
      jpg: {
        large_image_url?: string;
      };
    };
  };
}

export interface AnimeSecondaryDetailsCardProps {
  anime: {
    type?: string;
    episodes?: number;
    status?: string;
    aired?: {
      string?: string;
    };
    season?: string;
    year?: string;
    studios?: Array<{
      name: string;
    }>;
    duration?: string;
    rating?: string;
    genres?: Array<{
      name: string;
    }>;
  };
}
