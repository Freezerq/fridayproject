import React from 'react'

import { SuperButton } from '../../components/common/SuperButton/SuperButton'
import { SuperCheckbox } from '../../components/common/SuperCheckbox/SuperCheckbox'
import { SuperInputText } from '../../components/common/SuperInputText/SuperInputText'

export const ComponentTest = () => {
  return (
    <div>
      <SuperButton>Test</SuperButton>
      <SuperCheckbox />
      <SuperInputText />
    </div>
  )
}
