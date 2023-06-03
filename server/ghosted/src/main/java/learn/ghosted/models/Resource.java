package learn.ghosted.models;

import java.util.Objects;

public class Resource {
    private int resourceId;
    private String title;
    private String link;
    private ResourceType resourceType;
    private int userId;

    public int getResourceId() {
        return resourceId;
    }

    public void setResourceId(int resourceId) {
        this.resourceId = resourceId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public ResourceType getResourceType() {
        return resourceType;
    }

    public void setResourceType(ResourceType resourceType) {
        this.resourceType = resourceType;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Resource resource = (Resource) o;
        return getResourceId() == resource.getResourceId() && getUserId() == resource.getUserId() && Objects.equals(getTitle(), resource.getTitle()) && Objects.equals(getLink(), resource.getLink()) && getResourceType() == resource.getResourceType();
    }

    @Override
    public int hashCode() {
        return Objects.hash(getResourceId(), getTitle(), getLink(), getResourceType(), getUserId());
    }
}
