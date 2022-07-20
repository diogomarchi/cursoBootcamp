import { Router } from 'express';
import { parseISO } from 'date-fns';
import AgendamentosRepository from '../repositories/AgendamentosRepository';
import CreateAgendamentoService from '../services/CreateAgendamentoService';

const agendamentosRouter = Router();
const agendamentosRepository = new AgendamentosRepository();

agendamentosRouter.get('/', (request, response) => {
  const agendamentos = agendamentosRepository.all();

  return response.json(agendamentos);
});

agendamentosRouter.post('/', (request, response) => {
  try {
    // nome do barbeiro e a data de agendamento
    const { provider, date } = request.body;

    const parseDate = parseISO(date);

    const createAgendamento = new CreateAgendamentoService(agendamentosRepository);

    const agendamento = createAgendamento.execute({
      date: parseDate,
      provider,
    });

    return response.json(agendamento);
  } catch (err) {
    if (err instanceof Error) {
      return response.status(400).json({ Error: err.message });
    }
    console.log('Unexpected error', err);
  }
});

export default agendamentosRouter;
