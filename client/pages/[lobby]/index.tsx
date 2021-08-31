import { Button } from '@material-ui/core';
import { MemberList } from 'components/Lobby/memberList';
import Link from 'next/link';

const LobbyPage = () => {
  return (
    <div>
      <div>Lobby Title</div>
      <div>Dealer Name</div>
      <Link href="/lobby/game">
        <Button color="primary" variant="contained">
          Start Game
        </Button>
      </Link>
      <Link href="/">
        <Button color="primary" variant="contained">
          Exit
        </Button>
      </Link>

      <MemberList />
      <div>Chat area</div>
    </div>
  );
};

export default LobbyPage;
