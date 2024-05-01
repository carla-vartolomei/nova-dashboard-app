import { FC } from 'react'
import { AppBar, Avatar, Stack, Toolbar, Typography } from '@mui/material'
import { useGetIdentity } from '@refinedev/core'
import { HamburgerMenu, RefineThemedLayoutV2HeaderProps } from '@refinedev/mui'

export interface IUser {
  id: number
  name: string
  avatar: string
}

const Header: FC<RefineThemedLayoutV2HeaderProps> = ({ sticky = true }) => {
  const { data: user } = useGetIdentity<IUser>()

  return (
    <AppBar position={sticky ? 'sticky' : 'relative'}>
      <Toolbar>
        <Stack
          direction="row"
          width="100%"
          justifyContent="flex-end"
          alignItems="center"
        >
          <HamburgerMenu />
          <Stack
            direction="row"
            width="100%"
            justifyContent="flex-end"
            alignItems="center"
          >
            {(user?.avatar || user?.name) && (
              <Stack
                direction="row"
                gap="16px"
                alignItems="center"
                justifyContent="center"
              >
                <Avatar src={user?.avatar} alt={user?.name} />
                {user?.name && (
                  <Typography
                    sx={{
                      display: {
                        xs: 'none',
                        sm: 'inline-block',
                      },
                    }}
                    variant="subtitle2"
                  >
                    {user?.name}
                  </Typography>
                )}
              </Stack>
            )}
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}

export default Header
