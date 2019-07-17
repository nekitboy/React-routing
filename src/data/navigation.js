export const mainMenuLinks = [
  { link: '/', text: 'Home' },
  {
    link: '/about',
    text: 'About Us',
    items: [
      { link: '/teachers', text: 'Teachers' },
      { link: '/school', text: 'Our School' }
    ]
  },
  { link: '/admissions', text: 'Admissions' },
  { link: '/courses', text: 'Courses' },
  { link: '/contact', text: 'Contact' }
]

export const footerMenuLinks = mainMenuLinks
