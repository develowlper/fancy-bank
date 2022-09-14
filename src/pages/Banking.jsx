import { Euro } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { Container, alpha } from '@mui/system';

import { useForm } from 'react-hook-form';

import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabaseClient';
import { useLoaderData } from 'react-router';

export default function Banking() {
  const { register, handleSubmit } = useForm();
  const theme = useTheme();
  const loaderData = useLoaderData();

  const { data, error } = loaderData;
  console.log(data);

  const queryClient = useQueryClient();

  const balances = data;

  if (error) {
    return <Alert severity="error">{error}</Alert>;
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
