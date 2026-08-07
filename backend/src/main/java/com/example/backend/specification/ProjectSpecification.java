package com.example.backend.specification;

import org.springframework.data.jpa.domain.Specification;

import com.example.backend.entity.Project;
import com.example.backend.enums.Oncelik;
import com.example.backend.enums.ProjeDurumu;

import jakarta.persistence.criteria.Predicate;

import java.util.ArrayList;
import java.util.List;

public class ProjectSpecification {

    public static Specification<Project> filterProjects(
            String arama,
            ProjeDurumu durum,
            Oncelik oncelik,
            Long yoneticiId
    ) {

        return (root, query, criteriaBuilder) -> {

            List<Predicate> predicates = new ArrayList<>();

            if (arama != null && !arama.isBlank()) {

                predicates.add(
                        criteriaBuilder.like(
                                criteriaBuilder.lower(root.get("projeAdi")),
                                "%" + arama.toLowerCase() + "%"
                        )
                );

            }

            if (durum != null) {

                predicates.add(
                        criteriaBuilder.equal(
                                root.get("durum"),
                                durum
                        )
                );

            }

            if (oncelik != null) {

                predicates.add(
                        criteriaBuilder.equal(
                                root.get("oncelik"),
                                oncelik
                        )
                );

            }

            if (yoneticiId != null) {

                predicates.add(
                        criteriaBuilder.equal(
                                root.get("projeYoneticisi").get("id"),
                                yoneticiId
                        )
                );

            }

            return criteriaBuilder.and(
                    predicates.toArray(new Predicate[0])
            );

        };

    }

}