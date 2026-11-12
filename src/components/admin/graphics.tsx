import Image from 'next/image'
import React from 'react'

/** Login / create-first-user screen logo (admin.components.graphics.Logo). */
export const EcozynthLogo = () => (
  <Image
    alt="Ecozynth"
    className="ecz-logo"
    height={134}
    priority
    src="/brand/logo-trimmed.png"
    width={339}
  />
)

/** Small square mark used in the admin header and nav (admin.components.graphics.Icon). */
export const EcozynthIcon = () => (
  <Image alt="Ecozynth" className="ecz-icon" height={134} src="/brand/logo-mark.png" width={106} />
)

/** Brand header at the top of the sidebar (admin.components.beforeNavLinks). */
export const EcozynthNavBrand = () => (
  <div className="ecz-nav-brand">
    <Image
      alt=""
      className="ecz-nav-brand__mark"
      height={134}
      src="/brand/logo-mark.png"
      width={106}
    />
    <div className="ecz-nav-brand__text">
      <span className="ecz-nav-brand__name">Ecozynth</span>
      <span className="ecz-nav-brand__sub">Store admin</span>
    </div>
  </div>
)
