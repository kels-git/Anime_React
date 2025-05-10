import { useState, useEffect } from 'react';
import {
    TextField,
    CircularProgress,
    Typography,
    Container,
    Box,
    Pagination,
    IconButton,
    InputAdornment,
    Paper
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { ApiHelperService } from '../api/api-helper-service';
import { AnimeCard } from '../components/ui/AnimeCard';
import { Labels } from '../enum/label';

const AnimeListing: React.FC = ({ }) => {

    const [animeList, setAnimeList] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [inputValue, setInputValue] = useState<string>('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            setDebouncedSearchTerm(inputValue);
        }, 500);

        return () => {
            clearTimeout(debounceTimer);
        };
    }, [inputValue]);

    useEffect(() => {
        const fetchAnime = async () => {
            try {
                setLoading(true);
                let response;

                if (debouncedSearchTerm.trim()) {
                    response = await ApiHelperService.searchAnime(debouncedSearchTerm, page);
                } else {
                    response = await ApiHelperService.getAllAnime({ page });
                }

                console.log('API response->', response);

                if (response?.data?.data) {
                    setAnimeList(response.data.data);

                    // Calculate total pages based on pagination info
                    const totalPage = response?.data?.pagination?.items?.total || 100;
                    const lastPage = response?.data?.pagination?.last_visible_page || 1;
                    const per_page = response?.data?.pagination?.items?.per_page || 24;
                    setTotalPages(lastPage);
                } else {
                    setAnimeList([]);
                    setTotalPages(0);
                }
            } catch (error) {
                console.error('Failed to fetch anime->', error);
                setError('Failed to load anime. Please try again later.');
                setAnimeList([]);
            } finally {
                setLoading(false);
            }
        };

        fetchAnime();
    }, [debouncedSearchTerm, page]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);

        if (page !== 1) {
            setPage(1);
        }
    };

    const handleClearSearch = () => {
        setInputValue('');
        setPage(1);
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        console.log('Page changed->', value);
        setPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2, bgcolor: '#673ab7' }}>
                <Typography variant="h5" gutterBottom sx={{ color: 'white', fontWeight: 'bold' }}>
                    {Labels.ANIME_SEARCH_APP}
                </Typography>

                <Box sx={{ position: 'relative' }}>
                    <TextField
                        fullWidth
                        placeholder="Search for anime..."
                        variant="outlined"
                        value={inputValue}
                        onChange={handleInputChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                            endAdornment: inputValue && (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleClearSearch} edge="end" size="small">
                                        <ClearIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                            sx: { bgcolor: 'white', borderRadius: 1 }
                        }}
                    />
                </Box>
            </Paper>

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                    <CircularProgress size={60} />
                </Box>
            ) : error ? (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                    <Typography color="error" variant="h6">{error}</Typography>
                </Box>
            ) : animeList.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                    <Typography variant="h6">No anime found. Try a different search term.</Typography>
                </Box>
            ) : (
                <>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center' }}>
                        {animeList.map((anime, index) => (
                            <Box
                                key={`${anime?.mal_id}-${index}`}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    width: {
                                        xs: '100%',
                                        sm: 'calc(50% - 24px)',
                                        md: 'calc(33.333% - 24px)',
                                        lg: 'calc(25% - 24px)',
                                    }
                                }}
                            >
                                <AnimeCard anime={anime} />
                            </Box>
                        ))}
                    </Box>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6, mb: 2 }}>
                            <Pagination
                                count={totalPages}
                                page={page}
                                onChange={handlePageChange}
                                color="primary"
                                size="large"
                                showFirstButton
                                showLastButton
                            />
                        </Box>
                    )}
                </>
            )}
        </Container>
    );
};

export default AnimeListing;