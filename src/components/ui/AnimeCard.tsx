import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AnimeCardProps } from '../../types/anime_types';

export const AnimeCard: React.FC<AnimeCardProps> = ({ anime }) => {

    const navigate = useNavigate();

    const handleClick = (anime: any) => {
        console.log('Anime clicked->', anime);
        navigate(`/anime-details/${anime?.mal_id}/full`);
    };

    return (

        <Card
            onClick={() => handleClick?.(anime)}
            sx={{
                width: '225px',
                height: '100%',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': {
                    transform: 'scale(1.03)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                },
            }}
        >
            <CardMedia
                component="img"
                height="320"
                image={anime.images.jpg.image_url}
                alt={anime.title}
                sx={{ objectFit: 'cover' }}
            />
            <CardContent sx={{ p: 2, pb: 2, height: '80px', overflow: 'hidden' }}>
                <Typography
                    gutterBottom
                    variant="subtitle1"
                    component="div"
                    sx={{
                        fontWeight: 'bold',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        lineHeight: '1.2em',
                        maxHeight: '2.4em'
                    }}
                >
                    {anime.title}
                </Typography>
            </CardContent>
        </Card>
    );
};