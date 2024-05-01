import axios from 'axios'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import { Authenticated, Refine } from '@refinedev/core'
import { DevtoolsProvider } from '@refinedev/devtools'
import { RefineKbar, RefineKbarProvider } from '@refinedev/kbar'
import {
  ErrorComponent,
  notificationProvider,
  RefineSnackbarProvider,
  ThemedLayoutV2,
} from '@refinedev/mui'
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from '@refinedev/react-router-v6'
import dataProvider from '@refinedev/simple-rest'

import { CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material'
import {
  AccountCircleOutlined,
  ChatBubbleOutline,
  Dashboard,
  PeopleAltOutlined,
  StarOutlineRounded,
  VillaOutlined,
} from '@mui/icons-material'

import { Header, Title } from './components'
import {
  Login,
  Home,
  AllProperties,
  CreateProperty,
  EditProperty,
  PropertyDetails,
  Agents,
  AgentProfile,
  MyProfile,
} from './pages'

import { CredentialResponse } from './interfaces/google'
import { parseJwt } from './utils/parse-jwt'
import { theme } from './theme'

const axiosInstance = axios.create()
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (config.headers) {
    config.headers['Authorization'] = `Bearer ${token}`
  }

  return config
})

function App() {
  const authProvider = {
    login: async ({ credential }: CredentialResponse) => {
      const profileObj = credential ? parseJwt(credential) : null

      // save user to MongoDB ...
      if (profileObj) {
        const response = await fetch(
          'https://nova-dashboard-app.onrender.com',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: profileObj.name,
              email: profileObj.email,
              avatar: profileObj.picture,
            }),
          }
        )

        const data = await response.json()

        if (response.status === 200) {
          localStorage.setItem(
            'user',
            JSON.stringify({
              ...profileObj,
              avatar: profileObj.picture,
              userid: data._id,
            })
          )
        } else {
          return {
            success: false,
          }
        }
      }

      localStorage.setItem('token', `${credential}`)

      return {
        success: true,
        redirectTo: '/',
      }
    },
    logout: async () => {
      const token = localStorage.getItem('token')

      if (token && typeof window !== 'undefined') {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        axios.defaults.headers.common = {}
        window.google?.accounts.id.revoke(token, () => {
          return {}
        })
      }

      return {
        success: true,
        redirectTo: '/login',
      }
    },
    onError: async (error: any) => {
      console.error(error)
      return { error }
    },
    check: async () => {
      const token = localStorage.getItem('token')

      if (token) {
        return {
          authenticated: true,
        }
      }

      return {
        authenticated: false,
        error: {
          message: 'Check failed',
          name: 'Token not found',
        },
        logout: true,
        redirectTo: '/login',
      }
    },
    getPermissions: async () => null,
    getIdentity: async () => {
      const user = localStorage.getItem('user')
      if (user) {
        return JSON.parse(user)
      }

      return null
    },
  }

  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <CssBaseline />
        <GlobalStyles
          styles={{
            html: { WebkitFontSmoothing: 'auto' },
          }}
        />
        <RefineSnackbarProvider>
          <DevtoolsProvider>
            <ThemeProvider theme={theme}>
              <Refine
                dataProvider={dataProvider(
                  'https://nova-dashboard-app.onrender.com'
                )}
                notificationProvider={notificationProvider}
                routerProvider={routerBindings}
                authProvider={authProvider}
                resources={[
                  {
                    name: 'dashboard',
                    list: '/dashboard',
                    options: { label: 'Dashboard' },
                    icon: <Dashboard />,
                  },
                  {
                    name: 'properties',
                    list: '/properties',
                    create: '/properties/create',
                    edit: '/properties/edit/:id',
                    show: '/properties/show/:id',
                    icon: <VillaOutlined />,
                  },
                  {
                    name: 'agents',
                    list: '/agents',
                    show: '/agents/show/:id',
                    icon: <PeopleAltOutlined />,
                  },
                  {
                    name: 'reviews',
                    list: '/reviews',
                    icon: <StarOutlineRounded />,
                  },
                  {
                    name: 'messages',
                    list: '/message',
                    icon: <ChatBubbleOutline />,
                  },
                  {
                    name: 'my-profile',
                    list: '/my-profile',
                    options: { label: 'My Profile' },
                    icon: <AccountCircleOutlined />,
                  },
                ]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: 'IJ5d0I-8rX4ZF-irmWPF',
                }}
              >
                <Routes>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-inner"
                        fallback={<CatchAllNavigate to="/login" />}
                      >
                        <ThemedLayoutV2
                          Header={() => <Header sticky />}
                          Title={(props) => <Title {...props} />}
                        >
                          <Outlet />
                        </ThemedLayoutV2>
                      </Authenticated>
                    }
                  >
                    <Route
                      index
                      element={<NavigateToResource resource="dashboard" />}
                    />

                    <Route path="/dashboard">
                      <Route index element={<Home />} />
                    </Route>

                    <Route path="/properties">
                      <Route index element={<AllProperties />} />
                      <Route path="create" element={<CreateProperty />} />
                      <Route path="edit/:id" element={<EditProperty />} />
                      <Route path="show/:id" element={<PropertyDetails />} />
                    </Route>

                    <Route path="/agents">
                      <Route index element={<Agents />} />
                      <Route path="show/:id" element={<AgentProfile />} />
                    </Route>

                    <Route path="/reviews">
                      <Route index element={<Home />} />
                    </Route>

                    <Route path="/messages">
                      <Route index element={<Home />} />
                    </Route>

                    <Route path="/my-profile">
                      <Route index element={<MyProfile />} />
                    </Route>

                    <Route path="*" element={<ErrorComponent />} />
                  </Route>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-outer"
                        fallback={<Outlet />}
                      >
                        <NavigateToResource />
                      </Authenticated>
                    }
                  >
                    <Route path="/login" element={<Login />} />
                  </Route>
                </Routes>

                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
            </ThemeProvider>
          </DevtoolsProvider>
        </RefineSnackbarProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  )
}

export default App
