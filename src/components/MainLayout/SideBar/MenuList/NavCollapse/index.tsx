import PropTypes from 'prop-types';
import {useState} from 'react';
import {useSelector} from 'react-redux';

// material-ui
import {useTheme} from '@mui/material/styles';
import {Collapse, List, ListItemButton, ListItemIcon, ListItemText, Typography} from '@mui/material';

// project imports
import NavItem from '../NavItem';

// assets
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

// ==============================|| SIDEBAR MENU LIST COLLAPSE ITEMS ||============================== //

const NavCollapse = ({menu, level}: any) => {
    const theme: any = useTheme();
    const customization = useSelector((state: any) => state.customization);

    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(null);

    const handleClick = () => {
        setOpen(!open);
        setSelected(!selected ? menu.id : null);
    };

    // menu collapse & item
    const menus = menu.children?.map((item: any) => {
        switch (item.type) {
            case 'collapse':
                return <NavCollapse key={item.id} menu={item} level={level + 1}/>;
            case 'item':
                return <NavItem key={item.id} item={item} level={level + 1}/>;
            default:
                return (
                    <Typography key={item.id} variant="h6" color="error" align="center">
                        Menu Items Error
                    </Typography>
                );
        }
    });

    const menuIcon = menu?.icon ? (
        menu?.icon
    ) : (
        <FiberManualRecordIcon
            sx={{
                width: selected === menu.id ? 8 : 6,
                height: selected === menu.id ? 8 : 6
            }}
            fontSize={level > 0 ? 'inherit' : 'medium'}
        />
    );

    return (
        <>
            <ListItemButton
                sx={{
                    borderRadius: `${customization.borderRadius}px`,
                    mb: 0.5,
                    alignItems: 'flex-start',
                    backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
                    py: level > 1 ? 1 : 1.25,
                    pl: `${level * 24}px`
                }}
                selected={selected === menu.id}
                onClick={handleClick}
            >
                <ListItemIcon sx={{my: 'auto', minWidth: !menu.icon ? 18 : 36}}>{menuIcon}</ListItemIcon>
                <ListItemText
                    primary={
                        <Typography variant={selected === menu.id ? 'h5' : 'body1'} color="inherit" sx={{my: 'auto'}}>
                            {menu.title}
                        </Typography>
                    }
                    secondary={
                        menu.caption && (
                            <Typography variant="caption" sx={{...theme.typography.subMenuCaption}} display="block"
                                        gutterBottom>
                                {menu.caption}
                            </Typography>
                        )
                    }
                />
                {open ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-up"
                         width="15" height="15" viewBox="0 0 20 20" strokeWidth="1.5" stroke="currentColor" fill="none"
                         strokeLinecap="round" strokeLinejoin="round" style={{marginTop: 'auto', marginBottom: 'auto'}}>
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M6 15l6 -6l6 6"></path>
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-down"
                         width="15" height="15" viewBox="0 0 20 20" strokeWidth="1.5" stroke="currentColor" fill="none"
                         strokeLinecap="round" strokeLinejoin="round" style={{marginTop: 'auto', marginBottom: 'auto'}}>
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M6 9l6 6l6 -6"></path>
                    </svg>
                )}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List
                    component="div"
                    disablePadding
                    sx={{
                        position: 'relative',
                        '&:after': {
                            content: "''",
                            position: 'absolute',
                            left: '32px',
                            top: 0,
                            height: '100%',
                            width: '1px',
                            opacity: 1,
                            background: theme.palette.primary.light
                        }
                    }}
                >
                    {menus}
                </List>
            </Collapse>
        </>
    );
};

NavCollapse.propTypes = {
    menu: PropTypes.object,
    level: PropTypes.number
};

export default NavCollapse;
