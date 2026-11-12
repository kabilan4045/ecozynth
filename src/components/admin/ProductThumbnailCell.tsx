import type { DefaultServerCellComponentProps } from 'payload'
import type { Media, Product } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import './admin-cells.scss'

type GalleryRow = NonNullable<Product['gallery']>[number]

/** Products list: shows the first gallery image as a small thumbnail. */
export const ProductThumbnailCell = async ({
  cellData,
  link,
  linkURL,
  payload,
  rowData,
}: DefaultServerCellComponentProps) => {
  const firstRow = (Array.isArray(cellData) ? cellData[0] : undefined) as GalleryRow | undefined
  const imageRef = firstRow?.image

  let media: Media | null = null
  if (imageRef && typeof imageRef === 'object') {
    media = imageRef
  } else if (imageRef) {
    media = await payload
      .findByID({ collection: 'media', id: imageRef, depth: 0, disableErrors: true })
      .catch(() => null)
  }

  const thumb = media?.url ? (
    <Image
      alt={media.alt || ''}
      className="ecz-thumb"
      height={40}
      src={media.url}
      unoptimized
      width={40}
    />
  ) : (
    <span aria-hidden className="ecz-thumb ecz-thumb--empty" />
  )

  if (!link) return thumb

  const href = linkURL || `/admin/collections/products/${String(rowData?.id ?? '')}`
  return (
    <Link aria-label="Open product" href={href}>
      {thumb}
    </Link>
  )
}
