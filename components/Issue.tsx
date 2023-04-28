import { useContext } from 'react'
import { DaoStateDispatchContext, DaoStateContext } from '@/stores/daoState';

import Button from '@/components/Button';
import { useBlitzId } from '@/stores/blitzId';

export function Issue({ issue }: {
  issue: { number: number; title: string}
}) {
  const daoState = useContext(DaoStateContext);
  const dispatch = useContext(DaoStateDispatchContext);
  const blitzId = useBlitzId();
  const proposal = daoState.proposals.find((proposal) => proposal.number === issue.number);
  const isAuth = Boolean(blitzId);

  const voteTransaction = proposal?.transactions.find((transaction) => transaction.from === blitzId);
  const isVoted = Boolean(voteTransaction);

  const yesVotes = proposal?.transactions.filter((transaction) => transaction.comment === 'yes').length ?? 0;
  const noVotes = proposal?.transactions.filter((transaction) => transaction.comment === 'no').length ?? 0;

  const voteHandler = (comment: 'yes' | 'no') => () => dispatch({
    type: 'vote',
    payload: {
      number: issue.number,
      from: blitzId,
      comment,
    }
  });
  
  return (
    <div className={`flex flex-wrap justify-end items-center min-h-11 py-2 gap-3 text-sm border-b border-[#212234]`}>
      <h3 className="flex-grow"><span className="text-muted">#{issue.number}</span> {issue.title}</h3>
      <div className='flex-shrink-0 flex gap-3'>
        <Button
          disabled={isVoted}
          color={isVoted && voteTransaction?.comment === 'yes' ? 'green' : 'default'}
          size="small"
          onClick={voteHandler('yes')}
        >{yesVotes} yes</Button>
        <Button
          disabled={isVoted}
          color={isVoted && voteTransaction?.comment === 'no' ? 'red' : 'default'}
          size="small"
          onClick={voteHandler('no')}
        >{noVotes} no</Button>
      </div>
    </div>
  )
}
