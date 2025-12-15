---

description: "Task list for Physical AI & Humanoid Robotics Textbook"
---

# Tasks: Physical AI & Humanoid Robotics Textbook

**Input**: Design documents from `/specs/001-create-textbook/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The examples below include test tasks. Tests are OPTIONAL - only include them if explicitly requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- **Web app**: `backend/src/`, `frontend/src/`
- **Mobile**: `api/src/`, `ios/src/` or `android/src/`
- Paths shown below assume single project - adjust based on plan.md structure

<!--
  ============================================================================
  IMPORTANT: The tasks below are SAMPLE TASKS for illustration purposes only.

  The /sp.tasks command MUST replace these with actual tasks based on:
  - User stories from spec.md (with their priorities P1, P2, P3...)
  - Feature requirements from plan.md
  - Entities from data-model.md
  - Endpoints from contracts/

  Tasks MUST be organized by user story so each story can be:
  - Implemented independently
  - Tested independently
  - Delivered as an MVP increment

  DO NOT keep these sample tasks in the generated tasks.md file.
  ============================================================================
-->

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Create project structure per implementation plan in frontend/
- [X] T002 Initialize Docusaurus v3 project with TypeScript dependencies
- [X] T003 [P] Configure basic dependencies in package.json per plan.md
- [X] T004 [P] Create basic directory structure per plan.md project structure

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

Examples of foundational tasks (adjust based on your project):

- [X] T005 Setup content verification framework for primary source validation (NVIDIA docs, ROS 2 documentation, IEEE/arXiv papers, Unitree/Robotis GitHub repos, Isaac Sim tutorials)
- [X] T006 [P] Implement APA 7th edition citation formatter for in-text citations and References
- [X] T007 [P] Setup plagiarism detection tools and verification process for original paraphrasing
- [X] T008 Create base MDX components for Docusaurus v3 compatibility with dark mode and mobile responsiveness
- [X] T009 Configure accessibility features: alt text requirements, heading hierarchy, code syntax highlighting
- [X] T010 Setup source tracking system to ensure minimum 15 high-quality sources across book (at least 10 peer-reviewed papers or official NVIDIA/ROS documentation)
- [X] T011 Setup GitHub Actions CI/CD pipeline for deployment to GitHub Pages
- [X] T012 Configure Algolia DocSearch for the documentation site
- [X] T013 Create ROS 2 Python code snippet template with syntax highlighting framework
- [X] T014 Set up visual content framework for screenshots, diagrams, architecture figures, and Mermaid flowcharts
- [X] T015 Create custom dark purple theme with primary: #6B46C1, dark: #553C9A, accents: #E9D8FD
- [X] T016 Set up internationalization (i18n) with English and Urdu translations
- [X] T017 Setup environment variable management for GEMINI_API_KEY

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Student Accesses the Textbook (Priority: P1) 🎯 MVP

**Goal**: University students and hackathon participants can access a comprehensive, engaging textbook on Physical AI and Humanoid Robotics, navigate the content, access hands-on exercises, and download chapters for offline reading.

**Independent Test**: Can be fully tested by loading the website and navigating through chapters, accessing content, and verifying the learning outcomes and exercises are presented clearly.

### Tests for User Story 1 (OPTIONAL - only if tests requested) ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T018 [P] [US1] Integration test for textbook navigation in tests/integration/test_navigation.py
- [ ] T019 [P] [US1] Component test for PDF download functionality in tests/unit/test_pdf_download.py

### Implementation for User Story 1

- [X] T020 [P] [US1] Set up the 7 required chapter directories in frontend/docs/
- [X] T021 [P] [US1] Create basic MDX structure for 7 chapters with titles from spec.md FR-014
- [X] T022 [P] [US1] Add custom dark purple theme to navbar and footer components
- [X] T023 [US1] Implement hero section with humanoid robot + AI brain background
- [X] T024 [US1] Create module cards component with hover effects for 7 chapters
- [X] T025 [US1] Add one big purple glowing "Start Reading the Book →" button
- [X] T026 [US1] Implement custom MDX components for PDF download functionality per spec FR-018
- [X] T027 [US1] Update sidebar navigation in sidebars.ts to include all 7 chapters

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Student Performs Hands-On Labs (Priority: P2)

**Goal**: Students can engage with practical, hands-on exercises that reinforce the theoretical content about Physical AI and Humanoid Robotics with runnable code examples and clear instructions for ROS 2 robotics components.

**Independent Test**: Can be fully tested by following the lab instructions provided in a chapter and running the provided ROS 2 Python code examples.

### Tests for User Story 2 (OPTIONAL - only if tests requested) ⚠️

- [ ] T028 [P] [US2] Test for ROS 2 Python code execution in tests/integration/test_ros_code.py
- [ ] T029 [P] [US2] Component test for lab exercise functionality in tests/unit/test_lab_exercise.py

### Implementation for User Story 2

- [X] T030 [P] [US2] Create lab exercise MDX files for each of the 7 chapters in frontend/docs/0x-{chapter}/lab-exercise.mdx
- [X] T031 [P] [US2] Add ROS 2 Python code examples in each lab exercise with syntax highlighting
- [X] T032 [US2] Implement interactive code playground component for running ROS 2 code snippets
- [X] T033 [US2] Add learning outcomes section to each chapter per spec FR-015
- [X] T034 [US2] Add further reading section to each chapter per spec FR-015
- [X] T035 [US2] Add 2-3 visual elements (screenshots, diagrams, Mermaid charts) to each chapter per spec FR-005 and FR-027

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Student Uses RAG Chatbot for Questions (Priority: P3)

**Goal**: Students have access to an AI-powered chatbot that can answer questions specifically from the textbook content, helping them with concepts they didn't understand.

**Independent Test**: Can be fully tested by asking the chatbot specific questions from the textbook and verifying that it provides accurate, relevant answers.

### Tests for User Story 3 (OPTIONAL - only if tests requested) ⚠️

- [ ] T036 [P] [US3] Contract test for RAG chatbot API in tests/contract/test_chatbot_api.py
- [ ] T037 [P] [US3] Integration test for question answering in tests/integration/test_qa.py

### Implementation for User Story 3

- [X] T038 [P] [US3] Create RAG chatbot page at frontend/docs/chatbot.md
- [X] T039 [P] [US3] Implement RAG chatbot component with Gemini 1.5 Flash API integration
- [X] T040 [US3] Set up vectorization of textbook content for retrieval
- [X] T041 [US3] Create API endpoint for chatbot queries per contracts/chatbot-api.yaml
- [X] T042 [US3] Implement response formatting with sources from textbook content per spec FR-017 and FR-029

**Checkpoint**: At this point, User Stories 1, 2 AND 3 should all work independently

---

## Phase 6: User Story 4 - Instructor Evaluates Hardware Options (Priority: P4)

**Goal**: Instructors and students can access a comprehensive hardware guide that compares options, costs, and capabilities of different humanoid robotics platforms.

**Independent Test**: Can be fully tested by reviewing the hardware guide and verifying that it contains detailed information about available options, costs, and recommendations.

### Tests for User Story 4 (OPTIONAL - only if tests requested) ⚠️

- [ ] T043 [P] [US4] Component test for hardware guide page in tests/unit/test_hardware_guide.py
- [ ] T044 [P] [US4] Integration test for hardware cost comparison tables in tests/integration/test_hardware_comparison.py

### Implementation for User Story 4

- [X] T045 [P] [US4] Create hardware guide page at frontend/docs/hardware-guide.md per spec FR-016
- [X] T046 [US4] Add comprehensive hardware buying guide with cost tables
- [X] T047 [US4] Include options for Jetson Kit, RealSense, Unitree, cloud alternatives
- [X] T048 [US4] Add technical specifications for each component
- [X] T049 [US4] Provide recommendations based on budget constraints per spec FR-009

**Checkpoint**: At this point, all user stories should be independently functional

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T050 [P] Documentation updates in docs/ ensuring APA 7th edition citation format
- [ ] T051 Content verification to ensure all claims cite primary sources
- [ ] T052 Plagiarism scan across all content for original paraphrasing
- [ ] T053 [P] Add alt text to all images and ensure proper heading hierarchy for accessibility
- [ ] T054 Ensure minimum 15 high-quality sources threshold met (with 10+ peer-reviewed papers or official docs)
- [ ] T055 Code execution verification: ensure all ROS 2 Python snippets run correctly
- [ ] T056 Visual content quality assessment: verify 2-3 visual elements per chapter
- [ ] T057 Engaging, student-friendly language assessment for university students and hackathon participants
- [ ] T058 Docusaurus v3, MDX v3, dark mode, and mobile responsiveness validation
- [ ] T059 GitHub Pages deployment validation with GitHub Actions CI/CD
- [ ] T060 Run constitution compliance validation
- [X] T061 Create Quiz component for each chapter using React state or MDX components per spec FR-015 and FR-025
- [X] T062 Create Chapter Summary component with bullet points and Mermaid mindmap per spec FR-015
- [X] T063 Add Quiz and Summary components to end of each chapter
- [X] T064 Implement dark mode toggle functionality
- [X] T065 Add Urdu translations for all navigation elements and content
- [X] T066 Create custom footer with Panaversity/Panacloud branding and social links
- [X] T067 Verify content length is between 5,500–6,000 words per spec FR-023
- [X] T068 Update navbar with book logo, menu items, and language switcher per spec requirements
- [X] T069 Setup GitHub workflow for GitHub Pages deployment at .github/workflows/deploy.yml
- [X] T070 Run npm run build to verify successful build per spec FR-030

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3 → P4)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1 but should be independently testable
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but should be independently testable
- **User Story 4 (P4)**: Can start after Foundational (Phase 2) - May integrate with US1/US2/US3 but should be independently testable

### Within Each User Story

- Tests (if included) MUST be written and FAIL before implementation
- Models before services
- Services before endpoints
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all components for User Story 1 together:
Task: "Set up the 7 required chapter directories in frontend/docs/"
Task: "Create basic MDX structure for 7 chapters with titles from spec.md FR-014"
Task: "Add custom dark purple theme to navbar and footer components"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Add User Story 4 → Test independently → Deploy/Demo
6. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
   - Developer D: User Story 4
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence