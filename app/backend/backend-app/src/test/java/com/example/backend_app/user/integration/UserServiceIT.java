package com.example.backend_app.user.integration;

import com.example.backend_app.user.DTOs.EditUserDTO;
import com.example.backend_app.user.DTOs.UserDTO;
import com.example.backend_app.user.models.Role;
import com.example.backend_app.user.models.User;
import com.example.backend_app.user.repositories.UserRepository;
import com.example.backend_app.user.services.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@Transactional
public class UserServiceIT {

    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;


    @BeforeEach
    void setUp() {
        userRepository.deleteAll();
        userRepository.save(new User(null, "user" , "user@email.com",
                "firstName" , "lastName", "address",
                "password" , Role.ROLE_USER, new Date(), new Date(),
                true, new ArrayList<>()));
    }


    @Test
    void testGetAll(){
        int page = 0;
        int size = 10;
        String search="user";
        Boolean isVerified=true;
        Page<UserDTO> users = userService.getAll(page, size, search, isVerified);
        assertThat(users.getContent(), hasSize(lessThanOrEqualTo(size)));

        assertThat(users.getContent(), everyItem(hasProperty("username", notNullValue())));
    }

    @Test
    void testEditUser(){
        User user = userRepository.saveAndFlush(new User(null, "test" , "test@email.com",
                "test" , "test", "test",
                "test" , Role.ROLE_USER, new Date(), new Date(),
                true, new ArrayList<>()));

        UserDetails currentUserDetails = mock(UserDetails.class);
        when(currentUserDetails.getUsername()).thenReturn(user.getEmail());
        Authentication authentication = mock(Authentication.class);
        when(authentication.getPrincipal()).thenReturn(currentUserDetails);
        SecurityContext securityContext = mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);

        SecurityContextHolder.setContext(securityContext);

        EditUserDTO editedUser = new EditUserDTO();
        editedUser.setUsername("changedUsername");
        editedUser.setFirstName("newFirstName");
        editedUser.setLastName("newLastName");
        editedUser.setAddress("newAddress");
        UserDTO updatedUserDTO = userService.editUser(editedUser, user.getId());

        User updatedUser = userRepository.findById(user.getId())
                .orElseThrow(() -> new AssertionError("Korisnik nije pronađen nakon izmene"));

        assertThat(updatedUser.getusername(), is("changedUsername"));
        assertThat(updatedUser.getFirstName(), is("newFirstName"));
        assertThat(updatedUser.getLastName(), is("newLastName"));
        assertThat(updatedUser.getAddress(), is("newAddress"));

        assertThat(updatedUser.getEmail(), is(user.getEmail()));
        assertThat(updatedUser.getPassword(), is(user.getPassword()));
        assertThat(updatedUser.getRole(), is(user.getRole()));
        assertThat(updatedUser.getCreatedAt(), is(user.getCreatedAt()));
    }

}
