enum Element {
  Layout = "Layout"
}

const getTagName = (element: string) => {
  switch (element) {
    case Element.Layout: return 'main'
    default: return 'div'
  }
}

export {getTagName}