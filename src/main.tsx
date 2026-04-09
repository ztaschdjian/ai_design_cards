import React from 'react'
import ReactDOM from 'react-dom/client'
import { PostHogProvider } from 'posthog-js/react'
import App from './app/App'
import './styles/index.css'

const POSTHOG_KEY = 'phc_p4pfviEhXg9LYjrw3qff1JMKd7pGSdfqOUstCnRkBFN'
const POSTHOG_HOST = 'https://us.i.posthog.com'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PostHogProvider
      apiKey={POSTHOG_KEY}
      options={{
        api_host: POSTHOG_HOST,
        capture_pageview: false,
        capture_pageleave: true,
        autocapture: true,
      }}
    >
      <App />
    </PostHogProvider>
  </React.StrictMode>,
)
