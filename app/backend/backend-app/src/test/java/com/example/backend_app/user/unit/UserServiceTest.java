package com.example.backend_app.user.unit;

import com.example.backend_app.global.exception.ExceptionNotFound;
import com.example.backend_app.user.DTOs.UserDTO;
import com.example.backend_app.user.mappers.UserMapper;
import com.example.backend_app.user.models.User;
import com.example.backend_app.user.repositories.UserRepository;
import com.example.backend_app.user.services.UserService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {
    @Mock
    private UserRepository userRepository;

    @Mock
    private UserMapper userMapper;

    @InjectMocks
    private UserService userService;

    @Test
    void testGetUserById_found(){
        Long userId = 1L;
        User user = new User();
        user.setId(userId);
        user.setUsername("username");

        UserDTO expected = new UserDTO();
        expected.setId(userId);
        expected.setUsername("username");

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(userMapper.usertoUserDTO(user)).thenReturn(expected);

        UserDTO result = userService.getById(userId);

        assertNotNull(result);
        assertEquals(userId,result.getId());
        assertEquals("username",result.getUsername());

        verify(userRepository).findById(userId);
        verify(userMapper).usertoUserDTO(user);
    }

    @Test
    void testGetUserById_notFound() {
        when(userRepository.findById(anyLong())).thenReturn(Optional.empty());

        ExceptionNotFound exception = assertThrows(ExceptionNotFound.class,
                () -> userService.getById(1L));

        assertEquals("User not found!", exception.getMessage());

        verify(userRepository).findById(1L);
    }
}
