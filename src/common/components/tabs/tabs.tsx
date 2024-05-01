import * as TabsRadix from "@radix-ui/react-tabs"
import s from "./tabs.module.scss"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

type Props = {
  friend: string | null
}

export const Tabs = ({ friend }: Props) => {
  const navigate = useNavigate()
  const [value, setValue] = useState(`${friend === "false" ? "tab2" : "tab1"}`)
  const handleChange = (newValue: string) => {
    setValue(newValue)
    if (newValue === "tab1") {
      navigate("/users?count=10&page=1&friend=true")
    }
    if (newValue === "tab2") {
      navigate("/users?count=10&page=1&friend=false")
    }
  }
  return (
    <TabsRadix.Root defaultValue={value} orientation="vertical" onValueChange={handleChange}>
      <TabsRadix.List aria-label="tabs">
        <TabsRadix.Trigger value="tab1" className={`${s.tab} ${value === "tab1" ? s.active : ""}`}>
          Мои друзья
        </TabsRadix.Trigger>
        <TabsRadix.Trigger value="tab2" className={`${s.tab} ${value === "tab2" ? s.active : ""}`}>
          Все пользователи
        </TabsRadix.Trigger>
      </TabsRadix.List>
    </TabsRadix.Root>
  )
}
