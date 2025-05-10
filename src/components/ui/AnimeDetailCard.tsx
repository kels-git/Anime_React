import { Card, CardContent, Typography, Paper, Box, Button } from '@mui/material';
import { AnimeDetailsCardProps } from '../../types/anime_types';
import { Colors } from '../../enum/colors';
import { Labels } from '../../enum/label';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface AnimeExtraDetailsCardProps extends AnimeDetailsCardProps {
    action?: () => void;
}

export const AnimeDetailCard: React.FC<AnimeExtraDetailsCardProps> = ({ anime, action }) => {

    return (
        <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
                <Box sx={{
                    flexShrink: 0,
                    width: { xs: '100%', md: '300px' },
                    height: 'fit-content'
                }}>
                    <img
                        src={anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url}
                        alt={anime.title}
                        style={{
                            width: '100%',
                            borderRadius: '8px',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                        }}
                    />
                </Box>

                <Box sx={{ flex: 1 }}>

                    {anime?.title_english && anime?.title_english !== anime.title && (
                        <Typography variant="h6" color="text.secondary" gutterBottom>
                            {anime?.title_english}
                        </Typography>
                    )}

                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>{Labels.SYNOPSIS}</Typography>
                    <Typography paragraph sx={{ mb: 3 }}>
                        {anime?.synopsis || "No synopsis available."}
                    </Typography>

                    <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: 2, mt: 2 }}>
                        {[
                            {
                                bg: Colors.light_blue,
                                value: anime?.score || Labels.NOT_AVAILABLE,
                                label: anime?.scored_by ? `${anime?.scored_by.toLocaleString()} ${Labels.USERS}` : Labels.SCORED,
                                valueColor: Colors.dark_blue,
                                labelColor: Colors.blue
                            },
                            {
                                bg: Colors.light_purple,
                                value: `#${anime?.rank || Labels.NOT_AVAILABLE}`,
                                label: Labels.RANKED,
                                valueColor: Colors.dark_purple,
                                labelColor: Colors.pink
                            },
                            {
                                bg: Colors.light_red,
                                value: `#${anime?.popularity || Labels.NOT_AVAILABLE}`,
                                label: Labels.POPULARITY,
                                valueColor: Colors.dark_brown,
                                labelColor: Colors.red
                            },
                            {
                                bg: Colors.light_green,
                                value: anime?.members ? anime?.members.toLocaleString() : Labels.NOT_AVAILABLE,
                                label: Labels.MEMBERS,
                                valueColor: Colors.dark_green,
                                labelColor: Colors.emerald
                            }
                        ].map((item, index) => (
                            <Box key={index} sx={{ width: 'calc(25% - 12px)' }}>
                                <Card sx={{ backgroundColor: item.bg, height: '100%' }}>
                                    <CardContent sx={{ textAlign: 'center' }}>
                                        <Typography variant="h5" sx={{ color: item.valueColor, fontWeight: '700' }}>
                                            {item.value}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: item.labelColor, fontSize: '0.8rem' }}>
                                            {item.label}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Box>
                        ))}
                    </Box>

                </Box>
            </Box>
            <Button
                variant="contained"
                startIcon={<ArrowBackIcon />}
                onClick={action}
                sx={{ mt: 2, mb: 3, bgcolor: Colors.purple, '&:hover': { bgcolor: Colors.lighter_purple } }}
            >
                {Labels.BACK}
            </Button>
        </Paper>

    );
};