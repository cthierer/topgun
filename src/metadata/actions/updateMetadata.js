
export const UPDATED_METADATA = 'UPDATED_METADATA'

export default function updateMetadata({
  title,
  description,
}) {
  return {
    type: UPDATED_METADATA,
    data: {
      title,
      description,
    },
  }
}
