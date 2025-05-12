// components/ShayariList.jsx
'use client';

import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import ShayariCard from './ShayariCard';

const ShayariList = ({ shayaries }) => {
  
  return (
    <div className='min-h-screen w-full'>
      <AutoSizer>
        {({ height, width }) => (
          <List
            className='flex flex-wrap'
            height={height}
            width={width}
            itemSize={220}
            itemCount={shayaries.length}
          >
            {({ index, style }) => (
              <div style={style} className='px-2'>
                <ShayariCard
                  key={shayaries[index].id || index}
                  shayari={shayaries[index]}
                />
              </div>
            )}
          </List>
        )}
      </AutoSizer>
    </div>
  );
};

export default ShayariList;

