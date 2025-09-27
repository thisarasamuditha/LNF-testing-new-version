package com.thisara.LNF.service;

import com.thisara.LNF.dto.ItemRequest;
import com.thisara.LNF.dto.ItemResponse;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ItemService {
    ItemResponse createItem(ItemRequest request, MultipartFile imageFile) throws IOException;
    List<ItemResponse> getAllItems();
    ItemResponse getItemById(Long id);
    List<ItemResponse> getItemByUserId(Long userid);
    List<ItemResponse> getItemsByCategory(String category);
    ItemResponse updateItem(Long id, ItemRequest request);
    void deleteItem(Long id);
}
