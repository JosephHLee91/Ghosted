package learn.ghosted.data;

import learn.ghosted.models.Resource;
import learn.ghosted.models.ResourceType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class ResourceJdbcTemplateRepositoryTest {

    final static int NEXT_ID = 4;

    @Autowired
    ResourceJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldFindAll() {
        List<Resource> resourceList = repository.findAll();
        assertNotNull(resourceList);
    }

    @Test
    void shouldfindbyId() {
        Resource actual = repository.findById(1);
        assertEquals(1, actual.getResourceId());

        actual = repository.findById(999);
        assertEquals(null, actual);
    }

    @Test
    void shouldAdd() {
        Resource resource = makeResource();
        Resource actual = repository.add(resource);
        assertNotNull(actual);
        assertEquals(NEXT_ID, actual.getResourceId());
    }

    @Test
    void shouldUpdate() {
        Resource resource = makeResource();
        resource.setResourceId(3);
        assertTrue(repository.update(resource));

        resource.setResourceId(7);
        assertFalse(repository.update(resource));
    }

    @Test
    void shouldDelete() {
        assertTrue(repository.deleteById(2));
        assertFalse(repository.deleteById(2));
    }

    private Resource makeResource() {
        Resource resource = new Resource();
        resource.setTitle("Test Title");
        resource.setLink("Test Link");
        resource.setResourceType(ResourceType.MEDIA);
        resource.setUserId(1);
        return resource;
    }
}
