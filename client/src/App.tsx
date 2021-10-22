import { Persons } from './components/Persons';
import { SideNav } from './components/SideNav';
import { Person } from './Data';
import { useResizeHeight } from './hooks/useResizeHeight';
import { useWindowResize } from './hooks/useWindowResize';

interface AppProps {
  persons: Person[]
}

export const App = ({ persons }: AppProps) => {
  const size = useWindowResize();
  const elRef = useResizeHeight(49);

  return (
    <div className="ns-layout">
      <div className="header">
        Admin App
      </div>
      <div className="body">
        {size && size.width > 768 && <SideNav />}
        <div ref={elRef} className="main">
          <Persons persons={persons} />
        </div>
      </div>
    </div>
  );
};
