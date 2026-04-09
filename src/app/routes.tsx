import { createBrowserRouter } from 'react-router'
import { Root } from './components/Root'
import { PrinciplesView } from './components/PrinciplesView'
import { BenchmarkPrompt } from './components/BenchmarkPrompt'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: PrinciplesView },
      { path: 'benchmark', Component: BenchmarkPrompt },
    ],
  },
])
