import React from 'react';
import { AppDataGraph } from './components/AppDataGraph';
import { AppDataList } from './components/AppDataList';
import { AppHeader } from './components/AppHeader';
import { AppListPerson } from './components/AppListPerson';
import { AppMainMenu } from './components/AppMainMenu';
import { AppProfile } from './components/AppProfile';
import { StateContext } from './context/State'
import { useContext } from "react"
import { AppAllDataGraph } from './components/AppAllDataGraph';


function App() {
  const { currentPerson, currentQuestion } = useContext(StateContext)
  return (
    <div className="App">
      <AppHeader />
      <div style={{ marginTop: '64px', display: 'flex', }}>
        <div>
          <AppMainMenu />
          <AppListPerson />
        </div>
        {currentPerson &&
          <>
            <div style={{ marginLeft: 24, marginRight: 24, width: '100%' }}>
              <AppProfile />
              {currentQuestion &&
                <>
                  <div style={{ display: 'flex', flexDirection: 'row', marginTop: 24, alignItems: 'center', justifyContent: 'space-between' }}>
                    <AppDataGraph typeData={1} />
                    <AppDataGraph typeData={2} />
                  </div>
                  <div style={{ marginTop: 24, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <AppAllDataGraph typeData={1} />
                  </div>
                  <div style={{ marginTop: 24, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <AppAllDataGraph typeData={2} />
                  </div>
                </>
              }
            </div>
            <AppDataList />
          </>}

      </div>
    </div>
  );
}

export default App;
