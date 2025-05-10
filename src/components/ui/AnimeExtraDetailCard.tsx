import { Typography, Paper, Box, Divider } from '@mui/material';
import { AnimeSecondaryDetailsCardProps } from '../../types/anime_types';
import { Labels } from '../../enum/label';

export const AnimeExtraDetailCard: React.FC<AnimeSecondaryDetailsCardProps> = ({ anime }) => {

    return (

        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom>Information</Typography>
            <Divider sx={{ mb: 2 }} />

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>

                <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(33.333% - 16px)' } }}>
                    <Typography variant="subtitle1" fontWeight="bold">Type:</Typography>
                    <Typography variant="body1" paragraph>{anime?.type || Labels.NOT_AVAILABLE}</Typography>

                    <Typography variant="subtitle1" fontWeight="bold">Episodes:</Typography>
                    <Typography variant="body1" paragraph>{anime?.episodes || Labels.NOT_AVAILABLE}</Typography>

                    <Typography variant="subtitle1" fontWeight="bold">Status:</Typography>
                    <Typography variant="body1" paragraph>{anime?.status || Labels.NOT_AVAILABLE}</Typography>
                </Box>

                <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(33.333% - 16px)' } }}>
                    <Typography variant="subtitle1" fontWeight="bold">Aired:</Typography>
                    <Typography variant="body1" paragraph>
                        {anime?.aired?.string || 'N/A'}
                    </Typography>

                    <Typography variant="subtitle1" fontWeight="bold">Season:</Typography>
                    <Typography variant="body1" paragraph>
                        {anime?.season ? `${anime?.season.charAt(0).toUpperCase() + anime?.season.slice(1)} ${anime?.year || ''}` : Labels.NOT_AVAILABLE}
                    </Typography>

                    <Typography variant="subtitle1" fontWeight="bold">Studios:</Typography>
                    <Typography variant="body1" paragraph>
                        {anime?.studios?.map((studio: { name: any; }) => studio.name).join(', ') || Labels.NOT_AVAILABLE}
                    </Typography>
                </Box>

                <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(33.333% - 16px)' } }}>
                    <Typography variant="subtitle1" fontWeight="bold">Duration:</Typography>
                    <Typography variant="body1" paragraph>{anime?.duration || Labels.NOT_AVAILABLE}</Typography>

                    <Typography variant="subtitle1" fontWeight="bold">Rating:</Typography>
                    <Typography variant="body1" paragraph>{anime?.rating || Labels.NOT_AVAILABLE}</Typography>

                    <Typography variant="subtitle1" fontWeight="bold">Genres:</Typography>
                    <Typography variant="body1" paragraph>
                        {anime?.genres?.map((genre: { name: any; }) => genre.name).join(', ') || Labels.NOT_AVAILABLE}
                    </Typography>
                </Box>
            </Box>
        </Paper>

    );
};