import { nanoid } from "nanoid"

function generate() {
  const logoMarker = 'GWP'
  const date = new Date().toLocaleDateString()
  return `${logoMarker}-${date}-${nanoid(6)}`
}

export default generate