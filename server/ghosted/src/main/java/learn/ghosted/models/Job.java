package learn.ghosted.models;

import java.time.LocalDate;
import java.util.Date;

public class Job {
    private int jobId;
    private String title;
    private String company;
    private LocalDate dateApplied;
    private String link;
    private Status status;
    private String location;

    public Job () {

    }

    public Job(int jobId, String title, String company, LocalDate dateApplied, String link, Status status, String location) {
        this.jobId = jobId;
        this.title = title;
        this.company = company;
        this.dateApplied = dateApplied;
        this.link = link;
        this.status = status;
        this.location = location;
    }

    public int getJobId() {
        return jobId;
    }

    public void setJobId(int jobId) {
        this.jobId = jobId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public LocalDate getDateApplied() {
        return dateApplied;
    }

    public void setDateApplied(LocalDate dateApplied) {
        this.dateApplied = dateApplied;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }
}
