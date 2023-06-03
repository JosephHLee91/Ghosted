package learn.ghosted.models;

public enum Status {
    APPLIED("Applied"),
    ACCEPTED("Accepted"),
    DECLINED("Declined"),
    GHOSTED("Ghosted"),
    REJECTED("Rejected");

    private final String name;

    Status(String name) {
        this.name = name;
    }
    public String getName(){
        return name;
    }
    public static Status findByName(String name) {
        for (Status status : Status.values()) {
            if (status.getName().equalsIgnoreCase(name)) {
                return status;
            }
        }
        String message = String.format("Please choose a proper status");
                throw new RuntimeException(message);
    }
}
