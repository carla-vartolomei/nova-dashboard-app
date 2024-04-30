import { Box } from '@mui/material';
import { TitleProps } from '@refinedev/core';
import assets from '../../assets';

const Title = ({ collapsed }: TitleProps) => {
  const { logo, nova } = assets;
  return (
    <Box component="div">
      {collapsed ? (
        <img
          src={logo}
          alt="Nova Logo"
          style={{
            width: '40px',
            height: '40px',
          }}
        />
      ) : (
        <img
          src={nova}
          alt="Nova Logo"
          style={{
            width: '160px',
            height: '44px',
          }}
        />
      )}
    </Box>
  );
};

export default Title;
