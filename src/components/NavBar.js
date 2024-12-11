/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { signOut } from '../utils/auth';

export default function NavBar() {
  const router = useRouter();

  // Reusable html tag properties to keep things dry
  const createNavLinkProps = (route) => ({
    onClick: () => router.push(route), // onClick event that routes
    onKeyDown: (event) => {
      // linter needed a this.onKeyDown for use with an onClick event in a non-interactable html tag, but "this" doesn't exist in a stateless page. This is a workaround
      if (event.key === 'Enter' || event.key === ' ') {
        router.push(route);
      }
    },
    role: 'link', // linter also needed a role and tabIndex for using an onClick event with a non-interactable html tag
    tabIndex: 0,
    className: 'nav-link',
  });

  return (
    <Navbar collapseOnSelect expand="lg" className="navBorder" variant={{ color: '#F0C400' }}>
      <Container className="navBar">
        <a {...createNavLinkProps('/')} className="navbar-brand">
          <Image src="/images/favicon.ico" alt="Pantry Pal" width={100} height={100} />
        </a>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <a {...createNavLinkProps('/recipe/new')}>Add a Recipe</a>
            <a {...createNavLinkProps('/ingredient')}>Ingredients</a>
            <a {...createNavLinkProps('/ingredient/new')}>Add an Ingredient</a>
          </Nav>

          <Button className="bgOrange" variant="danger" onClick={signOut}>
            Sign Out
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
