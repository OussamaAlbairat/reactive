const registry = new Map()

const useRegistry = () => {
  const publish = (name) => {
    registry.set(name, { actions: [] })
  }

  const subscribe = (name, action) => {
    if (!registry.has(name)) return
    const obj = registry.get(name)
    obj.actions.push(action)
    console.log("subscribe")
  }

  const unsubscribe = (name, action) => {
    if (!registry.has(name)) return
    const obj = registry.get(name)
    obj.actions = obj.actions.filter((act) => act !== action)
    console.log("unsubscribe")
  }

  const dispatch = (name, data) => {
    if (!registry.has(name)) return
    const obj = registry.get(name)
    obj.actions.forEach((action) => {
      action?.(data)
    })
  }

  return { publish, subscribe, unsubscribe, dispatch }
}

export default useRegistry
