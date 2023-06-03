package learn.ghosted.domain;

import learn.ghosted.data.ResourceRepository;
import learn.ghosted.models.Resource;
import learn.ghosted.models.ResourceType;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.mockito.Mockito.when;

@SpringBootTest
public class ResourceServiceTest {

    @Autowired
    ResourceService service;

    @MockBean
    ResourceRepository repository;

    @Test
    void shouldFindAll() {
        List<Resource> expected = List.of(
                new Resource(),
                new Resource()
        );
        when(repository.findAll()).thenReturn(expected);
        List<Resource> actual = service.findAll();
        assertEquals(expected.size(), actual.size());
    }

    @Test
    void shouldFindById() {
        Resource expected = makeResource();
        when(repository.findById(1)).thenReturn(expected);
        Resource actual = service.findById(1);
        assertEquals(expected, actual);
    }

    @Test
    void shouldNotAddWhenInvalid() {

        // Shouldn't add null
        Result<Resource> result = service.add(null);
        assertEquals(ResultType.INVALID, result.getType());

        // Shouldn't add if resourceId is greater than 0
        Resource resource = makeResource();
        result = service.add(resource);
        assertEquals(ResultType.INVALID, result.getType());

        // Shouldn't add if resourceId is 0
        resource = makeResource();
        resource.setResourceId(0);
        resource.setTitle(null);
        result = service.add(resource);
        assertEquals(ResultType.INVALID, result.getType());

        // Shouldn't add if userId is equal to 0 (non-existent user)
        resource = makeResource();
        resource.setResourceId(0);
        resource.setUserId(0);
        result = service.add(resource);
        assertEquals(ResultType.INVALID, result.getType());
    }

    @Test
    void shouldAddWhenValid() {
        Resource expected = makeResource();
        Resource arg = makeResource();
        arg.setResourceId(0);

        when(repository.add(arg)).thenReturn(expected);
        when(repository.findById(1)).thenReturn(expected);
        Result<Resource> result = service.add(arg);
        assertEquals(ResultType.SUCCESS, result.getType());

        assertEquals(expected, result.getPayload());
    }

    @Test
    void shouldNotUpdateWhenInvalid() {
        // Shouldn't update null
        Result<Resource> result = service.update(null);
        assertEquals(ResultType.INVALID, result.getType());

        // Shouldn't update if userId is null
        Resource resource = makeResource();
        resource.setUserId(0);
        result = service.update(resource);
        assertEquals(ResultType.INVALID, result.getType());

        // Shouldn't update if title is null
        resource = makeResource();
        resource.setTitle(null);
        result = service.update(resource);
        assertEquals(ResultType.INVALID, result.getType());

        // Shouldn't update if resourceId is set to 0
        resource = makeResource();
        resource.setResourceId(0);
        result = service.update(resource);
        assertEquals(ResultType.INVALID, result.getType());
    }

    @Test
    void shouldUpdateWhenValid() {
        Resource resource = makeResource();
        resource.setTitle("New Test Title");

        when(repository.update(resource)).thenReturn(true);
        when(repository.findById(1)).thenReturn(resource);
        Result<Resource> result = service.update(resource);
        assertEquals(ResultType.SUCCESS, result.getType());
    }

    @Test
    void shouldNotDeleteWhenNotFound() {
        when(repository.deleteById(3)).thenReturn(false);
        Result<Resource> result = service.deleteById(3);
        assertEquals(ResultType.NOT_FOUND, result.getType());
    }

    @Test
    void shouldDelete() {
        when(repository.deleteById(2)).thenReturn(true);
        Result<Resource> result = service.deleteById(2);
        assertEquals(ResultType.SUCCESS, result.getType());
    }

    private Resource makeResource() {
        Resource resource = new Resource();
        resource.setResourceId(1);
        resource.setTitle("Test Title");
        resource.setLink("Test Link");
        resource.setResourceType(ResourceType.MEDIA);
        resource.setUserId(1);
        return resource;
    }
}
