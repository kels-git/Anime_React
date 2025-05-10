import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Typography, CircularProgress, Paper, Container } from '@mui/material';
import { ApiHelperService } from '../api/api-helper-service';
import { Labels } from '../enum/label';
import { AnimeDetailCard } from '../components/ui/AnimeDetailCard';
import { MenuPath } from '../enum/layout-enum';
import { AnimeExtraDetailCard } from '../components/ui/AnimeExtraDetailCard';

const AnimeDetails: React.FC = ({ }) => {
  const { id } = useParams();
  const [anime, setAnime] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnimeDetails = async () => {
      try {
        setLoading(true);
        const response = await ApiHelperService.getAnimeById(Number(id));
        console.log('Anime details:', response?.data?.data);
        setAnime(response?.data?.data);
      } catch (err) {
        setError('Failed to load anime details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnimeDetails();
  }, [id]);

  const handleBack = () => {
    navigate(MenuPath.ANIME_LISTING);
  };

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress />
    </Box>
  );

  if (error) return <Typography color="error">{error}</Typography>;
  if (!anime) return <Typography>Anime not found</Typography>;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2, bgcolor: '#673ab7' }}>
        <Typography variant="h5" gutterBottom sx={{ color: 'white', fontWeight: 'bold' }}>
          {Labels.ANIME_DETAILS_PAGE}
        </Typography>
      </Paper>

      <AnimeDetailCard anime={anime} action={handleBack} />
      <AnimeExtraDetailCard anime={anime} />

    </Container>
  );
};

export default AnimeDetails;