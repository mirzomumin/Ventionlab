import { Box, Typography, Paper, InputBase, IconButton } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';
import * as React from 'react';
import DefaultUser from '../assets/images/default_user.png';
import { chatSx } from '../common/styles/slider';

const MessageActionArea: React.FC<{ chat: null | number }> = ({ chat }) => {
  const messages = [
    {
      id: 1,
      content: 'hi',
      from: {
        username: 'user',
      },
      prevMsgFromYourself: false,
      createdAt: new Date(),
    },
    {
      id: 2,
      content: 'hello',
      from: {
        username: 'user2',
      },
      prevMsgFromYourself: true,
      createdAt: new Date(),
    },
  ];

  const imgSx = {
    marginLeft: '4pt',
    marginRight: '2pt',
    height: 30,
    width: 30,
    maxHeight: { xs: 25, md: 30 },
    maxWidth: { xs: 25, md: 30 },
  };

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateRows: '40pt 1fr 45pt',
        height: '100%',
      }}
    >
      <Box
        component="div"
        sx={{
          width: '100%',
          borderBottom: 1,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography>Chat title {chat}</Typography>
      </Box>

      <Box
        sx={{
          ...chatSx,
        }}
      >
        <Box
          sx={{
            paddingLeft: '10pt',
            paddingRight: '10pt',
          }}
        >
          {messages.map((message) => (
            <Box
              sx={{
                marginTop: 1,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                }}
              >
                {message.prevMsgFromYourself ? (
                  <Box
                    sx={{
                      ...imgSx,
                    }}
                  ></Box>
                ) : (
                  <Box
                    sx={{
                      ...imgSx,
                      borderRadius: '50%',
                    }}
                    component="img"
                    src={DefaultUser}
                  ></Box>
                )}
                <Box
                  sx={{
                    maxWidth: { xs: '30%', md: '60%' },
                    backgroundColor: 'primary.main',
                    borderRadius: '4pt 10pt 10pt 10pt',
                    padding: '4pt 10pt',
                  }}
                >
                  <Typography>
                    {message.content}
                    <Typography
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        marginLeft: '14px',
                        fontSize: '8pt',
                      }}
                    >
                      {message.createdAt.toLocaleTimeString('en-GB', {
                        hour: 'numeric',
                        minute: 'numeric',
                      })}
                    </Typography>
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      <Box
        sx={{
          display: 'inline - block',
          alignSelf: 'flex-end',
          borderTop: 1,
        }}
      >
        <Paper
          component="form"
          sx={{
            display: 'flex',
            alignItems: 'center',
            margin: '4pt',
            borderRadius: '14pt',
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Input Message"
            inputProps={{ 'aria-label': 'input message' }}
          />

          <IconButton
            type="button"
            sx={{
              p: '10px',
            }}
            aria-label="message"
          >
            <SendIcon />
          </IconButton>
        </Paper>
      </Box>
    </Box>
  );
};

const ChatArea: React.FC<{ chat: null | number }> = ({ chat }) => {
  const NotSelectedChat = () => {
    return (
      <Typography variant="h4" sx={{ textAlign: 'center', marginTop: '20%' }}>
        Not select Dialogue
      </Typography>
    );
  };

  return <Box sx={{ width: '75%' }}>{chat ? <MessageActionArea chat={chat} /> : <NotSelectedChat />}</Box>;
};

const ChatsSelectArea: React.FC<{
  selectDialog: React.Dispatch<React.SetStateAction<null | number>>;
}> = ({ selectDialog }) => {
  const [chats, setChats] = useState([
    {
      id: 1,
      title: 'Chat #1',
    },
    {
      id: 2,
      title: 'Chat #2',
    },
    {
      id: 3,
      title: 'Chat #3',
    },
    {
      id: 4,
      title: 'Chat #4',
    },
    {
      id: 5,
      title: 'Chat #5',
    },
    {
      id: 6,
      title: 'Chat #6',
    },
    {
      id: 7,
      title: 'Chat #7',
    },
    {
      id: 8,
      title: 'Chat #8',
    },
    {
      id: 9,
      title: 'Chat #9',
    },
    {
      id: 10,
      title: 'Chat #10',
    },
  ]); // TODO: Replace to api call
  const [chatsCopy, setChatsCopy] = useState<any>(); // Todo: Should get backend response typing

  useEffect(() => {
    console.log('ChatsUpdated');
    setChatsCopy(chats);
  }, []);

  const handleSearch = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (e.target.value !== '') {
      setChats(chatsCopy);
      setChats((prevState) => {
        return prevState.filter((chat) => chat.title.startsWith(e.target.value));
      });
    } else {
      setChats(chatsCopy);
    }
  };

  return (
    <Box
      sx={{
        width: '25%',
        borderRight: 1,
        ...chatSx,
      }}
    >
      <Paper
        component="form"
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          margin: '4pt',
          borderRadius: '14pt',
        }}
      >
        <InputBase
          onChange={handleSearch}
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Chats"
          inputProps={{ 'aria-label': 'search chats' }}
        />

        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      {chats.map((chat) => (
        <Box
          onClick={() => selectDialog(chat.id)}
          key={chat.id}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            '&:hover': {
              backgroundColor: 'background.hover',
            },
            alignItems: 'center',
            cursor: 'pointer',
          }}
        >
          <Box
            sx={{
              marginLeft: '4pt',
              height: 40,
              width: 40,
              maxHeight: { xs: 30, md: 40 },
              maxWidth: { xs: 30, md: 40 },
              borderRadius: '50%',
            }}
            component="img"
            src={DefaultUser}
          ></Box>
          <Typography
            sx={{
              width: '85%',
              padding: 1.5,
              marginBottom: 0,
            }}
          >
            {chat.title}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export const ChatsPage = () => {
  const [selectedDialogue, setSelectedDialogue] = useState<null | number>(null);
  return (
    <Box
      sx={{
        bgcolor: 'background.default',
        color: 'text.primary',
        borderColor: 'text.primary',
        padding: 2,
        height: '89.7vh',
      }}
    >
      <Box
        component="div"
        sx={{
          display: 'flex',
          justifyContent: 'space-around',

          border: 1,
          height: '80vh',
          borderRadius: 3,
          bgcolor: 'background.default',
          color: 'text.primary',
          borderColor: 'text.primary',
        }}
      >
        <ChatsSelectArea selectDialog={setSelectedDialogue} />
        <ChatArea chat={selectedDialogue} />
      </Box>
    </Box>
  );
};
