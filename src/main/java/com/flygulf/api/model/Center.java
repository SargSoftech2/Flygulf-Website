
// package com.flygulf.api.model;

// import jakarta.persistence.*;

// @Entity
// @Table(name = "centers")
// public class Center {

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     private String city;
//     private String address;
//     private String description;

// @Column(name = "head_office", nullable = false)
// private Boolean headOffice = false;

//     // GETTERS & SETTERS

//     public Long getId() {
//         return id;
//     }

//     public String getCity() {
//         return city;
//     }

//     public void setCity(String city) {
//         this.city = city;
//     }

//     public String getAddress() {
//         return address;
//     }

//     public void setAddress(String address) {
//         this.address = address;
//     }

//     public String getDescription() {
//         return description;
//     }

//     public void setDescription(String description) {
//         this.description = description;
//     }

//     public Boolean getHeadOffice() {
//         return headOffice;
//     }

//     public void setHeadOffice(Boolean headOffice) {
//         this.headOffice = headOffice;
//     }
// }



package com.flygulf.api.model;

import jakarta.persistence.*;

@Entity
@Table(name = "centers")
public class Center {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String city;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String address;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "head_office", nullable = false)
    private Boolean headOffice = false;

    // ── Getters & Setters ──

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Boolean getHeadOffice() { return headOffice; }
    public void setHeadOffice(Boolean headOffice) { this.headOffice = headOffice; }
}