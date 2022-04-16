import { Edit, User } from 'tabler-icons-react';
import { ThemeIcon, UnstyledButton, Group, Text } from '@mantine/core';
import { useMatch, Link, useResolvedPath } from 'react-router-dom';

function MainLink({ icon, color, label, link }) {
  const resolve = useResolvedPath(link);
  const match = useMatch(resolve.pathname);
  return (
    <UnstyledButton
      sx={(theme) => ({
        display: 'block',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color: theme.black,
        '&:hover': {
          backgroundColor: theme.colors.gray[0],
        },
        backgroundColor: match ? theme.colors.gray[1] : null,
      })}
      component={Link}
      to={link}
    >
      <Group>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>

        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  );
}

const data = [
  {
    icon: <Edit size={16} />,
    color: 'blue',
    label: 'Add new artical',
    link: '/admin/edit',
  },
  {
    icon: <User size={16} />,
    color: 'green',
    label: 'Profile',
    link: '/admin/profile',
  },
];

const NavList = () => {
  const links = data.map((link) => <MainLink {...link} key={link.label} />);
  return <>{links}</>;
};

export default NavList;
