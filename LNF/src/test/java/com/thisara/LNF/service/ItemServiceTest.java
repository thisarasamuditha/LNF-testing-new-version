package com.thisara.LNF.service;

import com.thisara.LNF.dto.ItemRequest;
import com.thisara.LNF.dto.ItemResponse;
import com.thisara.LNF.entity.Item;
import com.thisara.LNF.entity.ItemCategory;
import com.thisara.LNF.entity.ItemType;
import com.thisara.LNF.entity.User;
import com.thisara.LNF.repository.ItemRepository;
import com.thisara.LNF.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

// unit tests for itemserviceimpl
@ExtendWith(MockitoExtension.class)
class ItemServiceTest {

    @Mock
    private ItemRepository itemRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private ItemServiceImpl itemService;

    private User testUser;
    private Item testItem;
    private ItemRequest itemRequest;
    private MultipartFile testImageFile;

    @BeforeEach
    void setUp() {
        // Setup test user
        testUser = new User();
        testUser.setId(1L);
        testUser.setUsername("testuser");
        testUser.setEmail("test@example.com");
        testUser.setContactInfo("123-456-7890");

        // Setup test item
        testItem = new Item();
        testItem.setId(1L);
        testItem.setTitle("Lost Wallet");
        testItem.setDescription("Black leather wallet with ID cards");
        testItem.setCategory(ItemCategory.ACCESSORIES);
        testItem.setType(ItemType.LOST);
        testItem.setLocation("Library");
        testItem.setDate(LocalDate.now());
        testItem.setUser(testUser);
        testItem.setImage_data("test image data".getBytes());

        // Setup item request
        ItemRequest.UserDTO userRequest = new ItemRequest.UserDTO();
        userRequest.setEmail("test@example.com");

        itemRequest = new ItemRequest();
        itemRequest.setTitle("Lost Wallet");
        itemRequest.setDescription("Black leather wallet with ID cards");
        itemRequest.setCategory(ItemCategory.ACCESSORIES);
        itemRequest.setType(ItemType.LOST);
        itemRequest.setLocation("Library");
        itemRequest.setDate(LocalDate.now());
        itemRequest.setUser(userRequest);

        // Setup test image file
        testImageFile = new MockMultipartFile(
            "image",
            "test-image.jpg",
            "image/jpeg",
            "test image content".getBytes()
        );
    }

    @Test
    void testCreateItem_Success() throws IOException {
        // Arrange
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(testUser));
        when(itemRepository.save(any(Item.class))).thenReturn(testItem);

        // Act
        ItemResponse result = itemService.createItem(itemRequest, testImageFile);

        // Assert
        assertNotNull(result);
        assertEquals("Lost Wallet", result.getTitle());
        assertEquals("Black leather wallet with ID cards", result.getDescription());
        assertEquals(ItemCategory.ACCESSORIES, result.getCategory());
        assertEquals(ItemType.LOST, result.getType());
        assertEquals("Library", result.getLocation());
        assertEquals("testuser", result.getUser().getUsername());

        // Verify interactions
        verify(userRepository, times(1)).findByEmail("test@example.com");
        verify(itemRepository, times(1)).save(any(Item.class));
    }

    @Test
    void testGetAllItems_Success() {
        // Arrange
        List<Item> mockItems = Arrays.asList(testItem);
        when(itemRepository.findAll()).thenReturn(mockItems);

        // Act
        List<ItemResponse> result = itemService.getAllItems();

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Lost Wallet", result.get(0).getTitle());
        assertEquals("testuser", result.get(0).getUser().getUsername());

        verify(itemRepository, times(1)).findAll();
    }
}