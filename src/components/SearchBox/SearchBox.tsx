import React, { useState, memo } from 'react';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import useNotes from '../../hooks/useNotes';

const Search = styled('div')(({ theme }) => ({
  flexGrow:0.5,
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: '#f1f3f4',
  '&:hover': {
    backgroundColor: '#fff',
    border:'1px solid #dadce0',
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));
  
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
  
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
    marginLeft: '15px',
  },
}));

const SearchBox:React.FC = () => {

  const {addSearchText} = useNotes();
  const [searchText,setSearchText] = useState<string>('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const text = e.target.value;
    setSearchText(text);
    addSearchText({text});
  };

  const handleNavigate = () =>{
    navigate('/search');
  };

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon color={'action'} />
      </SearchIconWrapper>
      <StyledInputBase
        onClick={handleNavigate}
        value={searchText}
        onChange={handleChange}
        placeholder="Поиск"
        inputProps={{ 'aria-label': 'search' }}
      />
    </Search>
  );
};

export default memo(SearchBox);