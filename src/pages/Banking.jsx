import { Euro } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Grid,
  InputAdornment,
  LinearProgress,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { Container, alpha } from '@mui/system';

import { useForm } from 'react-hook-form';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabaseClient';

export default function Banking() {
  const { register, handleSubmit } = useForm();
  const theme = useTheme();

  const { data, isLoading } = useQuery(['balances'], () =>
    supabase
      .from('balances')
      .select('*')
      .order('created_at', { ascending: false })
  );

  const queryClient = useQueryClient();

  const balances = data?.data;
  const error = data?.error;

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (isLoading) {
    return <LinearProgress />;
  }

  const onSubmit = async (data) => {
    await supabase
      .from('balances')
      .insert([
        { created_by: supabase.auth.user().id, amount: Number(data.amount) },
      ]);

    queryClient.invalidateQueries('balances');
  };

  const difference =
    balances[0]?.amount - balances[balances.length - 1]?.amount;

  return (
    <Container component="main">
      <Box
        component="form"
        sx={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          defaultValue={0}
          type="number"
          step="any"
          label="amount"
          placeholder="enter amount here"
          {...register('amount')}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Euro />
              </InputAdornment>
            ),
          }}
          inputProps={{
            step: 0.01,
          }}
        />
        <Button type="submit">Send</Button>
      </Box>
      <Box>
        <Typography
          sx={{ color: difference > 0 ? 'success.main' : 'error.main' }}
        >
          Balance: {difference.toFixed(2)}{' '}
          <Euro fontSize="small" sx={{ ml: 1 }} />
        </Typography>
      </Box>
      <Box>
        <Grid
          container
          spacing={2}
          direction="column"
          sx={{ listStyle: 'none' }}
        >
          {balances.map((balance) => (
            <Grid
              item
              key={balance.id}
              sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }}
            >
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                  <Box>
                    <Euro fontSize="small" />
                  </Box>
                </Grid>
                <Grid item>
                  <Typography component="div">{balance.amount}</Typography>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
