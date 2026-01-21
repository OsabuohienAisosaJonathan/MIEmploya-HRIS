--
-- PostgreSQL database dump
--

\restrict qvuQF8hRfniCLTHLudZl3b0Sjk3bsHw0Cwn9of0eh4dIO3fgBTWKfaCdBIzWdaE

-- Dumped from database version 16.11 (f45eb12)
-- Dumped by pg_dump version 16.10

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: _system; Type: SCHEMA; Schema: -; Owner: neondb_owner
--

CREATE SCHEMA _system;


ALTER SCHEMA _system OWNER TO neondb_owner;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: replit_database_migrations_v1; Type: TABLE; Schema: _system; Owner: neondb_owner
--

CREATE TABLE _system.replit_database_migrations_v1 (
    id bigint NOT NULL,
    build_id text NOT NULL,
    deployment_id text NOT NULL,
    statement_count bigint NOT NULL,
    applied_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE _system.replit_database_migrations_v1 OWNER TO neondb_owner;

--
-- Name: replit_database_migrations_v1_id_seq; Type: SEQUENCE; Schema: _system; Owner: neondb_owner
--

CREATE SEQUENCE _system.replit_database_migrations_v1_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE _system.replit_database_migrations_v1_id_seq OWNER TO neondb_owner;

--
-- Name: replit_database_migrations_v1_id_seq; Type: SEQUENCE OWNED BY; Schema: _system; Owner: neondb_owner
--

ALTER SEQUENCE _system.replit_database_migrations_v1_id_seq OWNED BY _system.replit_database_migrations_v1.id;


--
-- Name: content_items; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.content_items (
    id integer NOT NULL,
    type character varying NOT NULL,
    title text NOT NULL,
    description text,
    url text,
    file_url text,
    filename text,
    image_url text,
    is_published boolean DEFAULT false,
    display_order integer NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    category character varying,
    is_favourite boolean DEFAULT false
);


ALTER TABLE public.content_items OWNER TO neondb_owner;

--
-- Name: content_items_display_order_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.content_items_display_order_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.content_items_display_order_seq OWNER TO neondb_owner;

--
-- Name: content_items_display_order_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.content_items_display_order_seq OWNED BY public.content_items.display_order;


--
-- Name: content_items_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.content_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.content_items_id_seq OWNER TO neondb_owner;

--
-- Name: content_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.content_items_id_seq OWNED BY public.content_items.id;


--
-- Name: job_applications; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.job_applications (
    id integer NOT NULL,
    job_id integer NOT NULL,
    full_name text NOT NULL,
    email text NOT NULL,
    phone text NOT NULL,
    state text NOT NULL,
    city text NOT NULL,
    cv_filename text NOT NULL,
    cv_url text NOT NULL,
    cover_note text,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.job_applications OWNER TO neondb_owner;

--
-- Name: job_applications_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.job_applications_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.job_applications_id_seq OWNER TO neondb_owner;

--
-- Name: job_applications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.job_applications_id_seq OWNED BY public.job_applications.id;


--
-- Name: job_applications_job_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.job_applications_job_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.job_applications_job_id_seq OWNER TO neondb_owner;

--
-- Name: job_applications_job_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.job_applications_job_id_seq OWNED BY public.job_applications.job_id;


--
-- Name: job_postings; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.job_postings (
    id integer NOT NULL,
    title text NOT NULL,
    company text NOT NULL,
    description text NOT NULL,
    requirements text NOT NULL,
    location text NOT NULL,
    state text NOT NULL,
    city text NOT NULL,
    category text NOT NULL,
    is_published boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.job_postings OWNER TO neondb_owner;

--
-- Name: job_postings_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.job_postings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.job_postings_id_seq OWNER TO neondb_owner;

--
-- Name: job_postings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.job_postings_id_seq OWNED BY public.job_postings.id;


--
-- Name: service_requests; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.service_requests (
    id integer NOT NULL,
    title character varying NOT NULL,
    full_name text NOT NULL,
    email text NOT NULL,
    phone text NOT NULL,
    state text NOT NULL,
    city text NOT NULL,
    user_status character varying NOT NULL,
    organization_name text,
    service text NOT NULL,
    description text NOT NULL,
    documents json DEFAULT '[]'::json,
    status character varying DEFAULT 'pending'::character varying,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.service_requests OWNER TO neondb_owner;

--
-- Name: service_requests_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.service_requests_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.service_requests_id_seq OWNER TO neondb_owner;

--
-- Name: service_requests_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.service_requests_id_seq OWNED BY public.service_requests.id;


--
-- Name: templates; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.templates (
    id integer NOT NULL,
    title text NOT NULL,
    description text,
    filename text NOT NULL,
    file_url text NOT NULL,
    file_type character varying NOT NULL,
    is_published boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.templates OWNER TO neondb_owner;

--
-- Name: templates_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.templates_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.templates_id_seq OWNER TO neondb_owner;

--
-- Name: templates_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.templates_id_seq OWNED BY public.templates.id;


--
-- Name: training_requests; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.training_requests (
    id integer NOT NULL,
    full_name text NOT NULL,
    email text NOT NULL,
    phone text NOT NULL,
    employment_status text,
    organization_name text,
    role text,
    interested_training text NOT NULL,
    preferred_start_date text,
    certification_required boolean DEFAULT false,
    verified_shortlist boolean DEFAULT false,
    status character varying DEFAULT 'new'::character varying,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.training_requests OWNER TO neondb_owner;

--
-- Name: training_requests_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.training_requests_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.training_requests_id_seq OWNER TO neondb_owner;

--
-- Name: training_requests_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.training_requests_id_seq OWNED BY public.training_requests.id;


--
-- Name: verified_candidates; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.verified_candidates (
    id integer NOT NULL,
    full_name text NOT NULL,
    title text NOT NULL,
    company text,
    service text NOT NULL,
    bio text,
    image_url text,
    status character varying DEFAULT 'pending'::character varying,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.verified_candidates OWNER TO neondb_owner;

--
-- Name: verified_candidates_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.verified_candidates_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.verified_candidates_id_seq OWNER TO neondb_owner;

--
-- Name: verified_candidates_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.verified_candidates_id_seq OWNED BY public.verified_candidates.id;


--
-- Name: replit_database_migrations_v1 id; Type: DEFAULT; Schema: _system; Owner: neondb_owner
--

ALTER TABLE ONLY _system.replit_database_migrations_v1 ALTER COLUMN id SET DEFAULT nextval('_system.replit_database_migrations_v1_id_seq'::regclass);


--
-- Name: content_items id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.content_items ALTER COLUMN id SET DEFAULT nextval('public.content_items_id_seq'::regclass);


--
-- Name: content_items display_order; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.content_items ALTER COLUMN display_order SET DEFAULT nextval('public.content_items_display_order_seq'::regclass);


--
-- Name: job_applications id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.job_applications ALTER COLUMN id SET DEFAULT nextval('public.job_applications_id_seq'::regclass);


--
-- Name: job_applications job_id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.job_applications ALTER COLUMN job_id SET DEFAULT nextval('public.job_applications_job_id_seq'::regclass);


--
-- Name: job_postings id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.job_postings ALTER COLUMN id SET DEFAULT nextval('public.job_postings_id_seq'::regclass);


--
-- Name: service_requests id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.service_requests ALTER COLUMN id SET DEFAULT nextval('public.service_requests_id_seq'::regclass);


--
-- Name: templates id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.templates ALTER COLUMN id SET DEFAULT nextval('public.templates_id_seq'::regclass);


--
-- Name: training_requests id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.training_requests ALTER COLUMN id SET DEFAULT nextval('public.training_requests_id_seq'::regclass);


--
-- Name: verified_candidates id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.verified_candidates ALTER COLUMN id SET DEFAULT nextval('public.verified_candidates_id_seq'::regclass);


--
-- Data for Name: replit_database_migrations_v1; Type: TABLE DATA; Schema: _system; Owner: neondb_owner
--

COPY _system.replit_database_migrations_v1 (id, build_id, deployment_id, statement_count, applied_at) FROM stdin;
1	63fb9bdc-1bf3-4946-b612-118d25d04ac3	9d5a296e-27ca-445c-ab17-36876d1c958b	2	2025-12-24 17:17:31.300061+00
2	f675ed9c-48cc-40d3-8635-4ba4765fee90	9d5a296e-27ca-445c-ab17-36876d1c958b	1	2025-12-25 08:04:11.045943+00
3	029620c3-24e3-41a9-8fa5-88354f8d38a5	9d5a296e-27ca-445c-ab17-36876d1c958b	2	2025-12-26 03:10:41.905855+00
\.


--
-- Data for Name: content_items; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.content_items (id, type, title, description, url, file_url, filename, image_url, is_published, display_order, created_at, category, is_favourite) FROM stdin;
16	news	OPENCLAX NEW FEATURES (CERTIFICATION & E- LIBRARY)	*Comprehensive Certification Module: Users are empowered to design and issue official certifications upon the successful completion of various milestones. Whether concluding a professional conference, a specialized seminar, an academic school term, or a corporate internal training program, our system automates the validation process to ensure every participant receives professional recognition for their achievements.\r\n\r\n*The Openclax Library Initiative: We are excited to announce that users can now redeem free vouchers toward the purchase of Openclax textbooks in schools. Beyond physical media, this initiative grants students unrestricted access to our comprehensive digital ecosystem. Students can engage with a full suite of e-content, including high-resolution PDFs, interactive audio lessons, and instructional videos, ensuring a rich, multi-modal learning experience.	https://storage.googleapis.com/replit-objstore-232166b7-5971-42fb-91f0-5ff29d636310/public/content/1766719303798-790607680.png	\N	1766719303798-790607680.png	https://storage.googleapis.com/replit-objstore-232166b7-5971-42fb-91f0-5ff29d636310/public/content/1766719303798-790607680.png	f	16	2025-12-26 03:21:44.520939	\N	f
13	news	OPENCLAX NEW FEATURES (CERTIFICATION & E- LIBRARY)	*Comprehensive Certification Module: Users are empowered to design and issue official certifications upon the successful completion of various milestones. Whether concluding a professional conference, a specialized seminar, an academic school term, or a corporate internal training program, our system automates the validation process to ensure every participant receives professional recognition for their achievements. \r\n\r\n*The Openclax Library Initiative: We are excited to announce that users can now redeem free vouchers toward the purchase of Openclax textbooks in schools. Beyond physical media, this initiative grants students unrestricted access to our comprehensive digital ecosystem. Students can engage with a full suite of e-content, including high-resolution PDFs, interactive audio lessons, and instructional videos, ensuring a rich, multi-modal learning experience.	/uploads/1766654176532-550643191.png	\N	1766654176532-550643191.png	/uploads/1766654176532-550643191.png	f	13	2025-12-25 09:16:16.743368	\N	t
19	news	HUMAN RESOURCES MANAGEMENT TRAINING FOR BEGINNERS 2026	*Modules: 10 (Min 2 weekly - Learner pace)\r\n*Date: 5th January 2026\r\n*Location: Via openclax.com (E-learning & Assessment)\r\n* Duration: 6 weeks\r\n*Training Fees: Free\r\n*Registration: #3500\r\n*Certification: Upon Request & Payment\r\n*Listing: Completion & Verification Request\r\n	/storage/content/1766722014533-550524116.png	\N	1766722014533-550524116.png	/storage/content/1766722014533-550524116.png	t	19	2025-12-26 04:06:55.318691	\N	t
20	news	MIEMPLOYA AUDITOPS COMING SOON JAN 5TH 2026	On 5 January 2026, Miemploya will officially release Miemploya AuditOps, a purpose-built platform designed to support auditors who conduct routine audits for lounges, restaurants, and hospitality businesses. The solution helps audit teams capture daily operational figures accurately, track sales and reported payments by department, manage inventory and purchases records, perform stock counts, and run reconciliations that highlight shortages, excesses, and discrepancies.\r\nWith structured workflows, audit checklists, automated summaries, and report generation in PDF and Excel, Miemploya AuditOps is built to improve audit speed, consistency, and transparency—making it easier for auditors to produce reliable findings, maintain audit trails, and deliver professional management reports to clients.	/storage/content/1766838579879-357486064.png	\N	1766838579879-357486064.png	/storage/content/1766838579879-357486064.png	t	20	2025-12-27 12:29:40.347443	\N	t
22	news	OPENCLAX NEW FEATURES (CERTIFICATION & LIBRARY )	Comprehensive Certification Module: Users are empowered to design and issue official certifications upon the successful completion of various milestones. Whether concluding a professional conference, a specialized seminar, an academic school term, or a corporate internal training program, our system automates the validation process to ensure every participant receives professional recognition for their achievements.\r\n\r\nThe Openclax Library Initiative: We are excited to announce that users can now redeem free vouchers toward the purchase of Openclax textbooks in schools. Beyond physical media, this initiative grants students unrestricted access to our comprehensive digital ecosystem. Students can engage with a full suite of e-content, including high-resolution PDFs, interactive audio lessons, and instructional videos, ensuring a rich, multi-modal learning experience.	/storage/content/1766839038607-943833386.png	\N	1766839038607-943833386.png	/storage/content/1766839038607-943833386.png	t	22	2025-12-27 12:37:19.36717	\N	t
\.


--
-- Data for Name: job_applications; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.job_applications (id, job_id, full_name, email, phone, state, city, cv_filename, cv_url, cover_note, created_at) FROM stdin;
2	2	Jimoh Abdulmalik 	jimohabdulmaliktunde@gmail.com	08132247359	Osun	Inisa, Odo-Otin Osun state	1767152528659-962066510.pdf	/storage/applications/1767152528659-962066510.pdf		2025-12-31 03:42:09.509761
3	2	Erhabor Imuetiyan Grace	imuetiyangrace15@gmail.com	08136407089	Edo	Benin City	1767155238010-14268434.pdf	/storage/applications/1767155238010-14268434.pdf	Dear Hiring Manager,\r\n\r\nI am writing to express my interest in the Club Hostess position at your esteemed establishment. With a Bachelor’s degree in Educational Management and hands-on experience in the hospitality industry, I am confident in my ability to contribute positively to your team and deliver excellent guest experiences.\r\n\r\nI previously worked in a hotel environment where I gained practical experience in customer service, guest relations, front-desk coordination, and maintaining a welcoming atmosphere for guests. This role strengthened my communication skills, professionalism, and ability to handle diverse clients with courtesy and efficiency.\r\n\r\nMy academic background in Educational Management has also equipped me with strong organizational skills, attention to detail, teamwork, and the ability to manage people effectively—qualities that are essential for a successful club hostess. I am well-presented, approachable, and skilled at ensuring guests feel comfortable, valued, and well attended to at all times.\r\nI am passionate about hospitality and committed to upholding high service standards while representing your club with dignity and professionalism. I would welcome the opportunity to bring my skills, experience, and positive attitude to your organization.\r\n\r\nThank you for considering my application. I look forward to the opportunity to discuss how I can contribute to your team.	2025-12-31 04:27:18.808123
4	3	Samuel sereke	sammycome15@gmail.com	09155858481	Edo	Benin city 	1767342642440-99362786.pdf	/storage/applications/1767342642440-99362786.pdf	Happy new year sir/ma. \r\n\r\nSir/ma ! believe me when I said that, I can do the work very well because I have a lot of experience about it, I can do it.	2026-01-02 08:30:43.400692
5	2	Okoro Ruth Chiadikaobi 	okororuth51@gmail.com	08101103072	Edo	Benin	1767349255610-44028042.pdf	/storage/applications/1767349255610-44028042.pdf		2026-01-02 10:20:56.471343
6	3	Ibe ifeoma Sophia 	ifeomasophia03@gmail.com	09130450133	Benin 	Sapele road 	1767605783224-365292199.png	/storage/applications/1767605783224-365292199.png	And helping out in the kitchen I am hard worker I am excited to learn and get experience 	2026-01-05 09:36:23.798142
7	3	Ibe ifeoma Sophia	ifeomasophia03@gmail.com	09130450133	Benin	Sapele Road	1767607456600-429764434.pdf	/storage/applications/1767607456600-429764434.pdf	I am really interested in this role because I love being part of a team and helping out in the kitchen. I am a hard worker and I am excited to learn and get experience.	2026-01-05 10:04:17.434775
8	11	Sunday edeh ochonu 	edeh5435@gmail.com	0707 540 8267	Edo	Benin city 	1767632120280-699847676.jpg	/storage/applications/1767632120280-699847676.jpg	Am interested in position because I feel and know that I can add a whole lot of experience that I have into the company if am giving the job 	2026-01-05 16:55:23.541726
9	13	ERHUNMWUN OVBOKHAN MICHEAL 	erhunmwunmichael@yahoo.com	0705 948 1577	Edo	Benin	1767632620842-380792149.pdf	/storage/applications/1767632620842-380792149.pdf	'm excited about the Operational Manager role because I'm passionate about streamlining processes and driving efficiency. With my experience in team coordination and problem-solving, I believe I can make a real impact. I'm eager to lead a team,and contribute to the company's growth. The role aligns with my skills and interests, and I'm confident I'd be a great fit.	2026-01-05 17:03:41.12396
10	13	ERHUNMWUN OVBOKHAN MICHEAL 	erhunmwunmichael@yahoo.com	0705 948 1577	Edo 	Benin	1767633094586-509890832.pdf	/storage/applications/1767633094586-509890832.pdf	I'm excited about the Operational Manager role because I'm passionate about streamlining processes and driving efficiency. With my experience in team coordination and problem-solving, I believe I can make a real impact. I'm eager to lead a team,and contribute to the company's growth. The role aligns with my skills and interests, and I'm confident I'd be a great fit.	2026-01-05 17:11:35.359883
11	12	Samuel edet sereke 	sammycome15@gmail.com	09155858481	Edo 	Benin city 	1767634892186-895820025.pdf	/storage/applications/1767634892186-895820025.pdf	Happy new year sir/ma \r\n\r\nMy name is Samuel edet sereke, Sir/ma,I have full experience on how to make shisha. I promise you that I can’t make it I have the experience.	2026-01-05 17:41:33.089687
12	14	Anyadike Ijeoma Jennifer 	jennyanyadike@gmail.com	09038852402	Edo State 	Benin city 	1767638964137-415370471.pdf	/storage/applications/1767638964137-415370471.pdf	I am an administrator,and it has always been my passion to work as one.Am flexible in what I do,I have clear communication stills and can multiple task.\r\nIt will be my pleasure to work in ur company.	2026-01-05 18:49:24.577591
13	12	Abuya Oseghale Goodluck 	abuyagoodluck24@gmail.com	09074915220	Edo state	Benin 	1767639243531-318580612.pdf	/storage/applications/1767639243531-318580612.pdf	I have brief experience and I'm opening to learning if taken	2026-01-05 18:54:03.772137
14	11	Abuya Oseghale Goodluck 	abuyagoodluck24@gmail.com	09074915220	Edo state 	Benin	1767639472973-716213053.pdf	/storage/applications/1767639472973-716213053.pdf	I only have 2 weeks experience but I'm open to learning or training if taken... 	2026-01-05 18:57:55.368779
15	2	Adamu Hope Lattifat 	hopeadamu87@gmail.com	08082349152	Edo state 	Benin city 	1767642033147-246840459.pdf	/storage/applications/1767642033147-246840459.pdf		2026-01-05 19:40:35.968807
16	2	Adamu Hope Lattifat 	hopeadamu87@gmail.com	08082349152	Edo state 	Benin city 	1767642161966-506314640.pdf	/storage/applications/1767642161966-506314640.pdf		2026-01-05 19:42:42.820629
17	13	Bello Emmanuel	belloemma@gmail.com	09161224792	Edo state	Benin City	1767645507724-12969463.pdf	/storage/applications/1767645507724-12969463.pdf	I’m interested in this role because it aligns with my strengths in operations, coordination, and leadership. \r\nI enjoy ensuring smooth daily operations, maintaining service standards, and using reports to drive efficiency and accountability. \r\nI thrive in fast-paced environments and take ownership of results while supporting teams to perform at their best.	2026-01-05 20:38:28.585181
18	14	Bello Emmanuel	belloemma@gmail.com	09161224792	Edo state	Benin City	1767645687344-731045512.pdf	/storage/applications/1767645687344-731045512.pdf	I’m interested in this role because it aligns with my strengths in administration, documentation, and organizational support. \r\nI enjoy keeping records accurate, coordinating vendors and supplies, and ensuring compliance and administrative processes run smoothly. \r\nSupporting management with clear reports and efficient scheduling is an area where I consistently add value.	2026-01-05 20:41:30.134963
19	7	IDOGUN GOD'SWILL OCHUKO	ochukoidogun474@gmail.com	09159689974	Edo state	Benin city	1767646030120-512316016.pdf	/storage/applications/1767646030120-512316016.pdf	Working in a hotel improves how I communicate, solve problems, and handle different kinds of people professionally.I’m patient, respectful, and attentive to details—qualities that are important in the hospitality industry.	2026-01-05 20:47:10.834164
20	13	Chioma Elizabeth iche 	chiomaiche27@gmail.com	08104926797	Edo	Benin 	1767656840898-211741250.pdf	/storage/applications/1767656840898-211741250.pdf	Dear ma/sir\r\nI'm excited to apply for this position.I'm a self-starter, detail-oriented, and proficient in various software and tools. I'm excited to bring my skills and experience to your team.\r\nThank you for considering my application.\r\nBest regards,\r\nChioma Elizabeth	2026-01-05 23:47:21.801291
21	2	Iche chioma Elizabeth 	chiomaiche27@gmail.com	08104926797	Edo state 	Benin city 	1767657234295-421460413.jpg	/storage/applications/1767657234295-421460413.jpg	Dear ma/sir\r\nI'm excited to apply for this position \r\nI'm a self-starter, detail-oriented, and proficient in various software and tools. I'm excited to bring my skills and experience to your team.\r\nThank you for considering my application.\r\nBest regards,\r\nChioma Elizabeth	2026-01-05 23:53:55.071956
22	7	Joshua Enogie	enogiejoshua119@gmail.com	07052322188	Edo state 	Benin city	1767683774158-558987196.pdf	/storage/applications/1767683774158-558987196.pdf	Hi, I'm Enogie Joshua . As a person with experience in hospitality, I'm confident in providing top-notch customer service, managing schedules, and keeping things organized. I'm eager to bring my warm communication skills and attention to detail to your company as a Receptionist. I'm looking for a role where I can connect with people and support the team - this job sounds like a perfect fit.	2026-01-06 07:16:15.154314
23	8	Joshua Enogie	enogiejoshua119@gmail.com	07052322188	Edo	Benin 	1767683996808-670909450.pdf	/storage/applications/1767683996808-670909450.pdf	As a supervisor, I'm a natural leader with a knack for bringing out the best in teams. With experience in hospitality and teaching, I know how to communicate effectively, solve problems, and keep things running smoothly. I'm excited to leverage my skills to drive results and support my team at your company . I'm all about growth, efficiency, and making a positive impact.	2026-01-06 07:19:57.199396
24	9	IDOGUN GODSWILL OCHUKO	ochukoidogun474@gmail.com	09159689974	Edo State 	Benin	1767685380259-545224987.pdf	/storage/applications/1767685380259-545224987.pdf	I’m interested in working as a wait staff because I enjoy interacting with people and providing excellent service. I like creating a positive experience for customers, making sure they feel welcome and satisfied. I’m also motivated by teamwork, learning new skills, and working in a fast-paced environment where I can contribute to the success of the hotel.	2026-01-06 07:43:03.122282
25	7	Idodgun Godswill Ochuko	ochukoidogun474@gmail.come	09159689974	Edo state	Benin city	1767685672368-151433471.pdf	/storage/applications/1767685672368-151433471.pdf	I love working as a hotel receptionist because I enjoy being the first point of contact for guests and creating a welcoming experience. I like helping people, solving problems, and ensuring their stay is smooth and enjoyable. It also gives me the chance to improve my communication, organization, and customer service skills in a professional environment.	2026-01-06 07:47:54.900457
26	9	Abuya Oseghale Goodluck 	Abuyagoodluck24@gmail.com	09074915220	Edo State	Benin	1767686008743-749686608.pdf	/storage/applications/1767686008743-749686608.pdf	I have work as a waiter in a big Restaurant and I want to showcase my skill and learn thing	2026-01-06 07:53:31.156993
27	7	Atiku Funmilayo Joy 	atikufunmilayo4@gmail.com	07069145124	Edo state 	Benin city 	1767687825442-586030967.pdf	/storage/applications/1767687825442-586030967.pdf	I am interested in the front desk officer position because I enjoy welcoming guests and ensuring they have a positive experience from arrival to departure. I have strong communication and customer service skills, and I understand the importance of professionalism, courtesy, and efficiency in a hotel environment.	2026-01-06 08:23:46.264328
28	2	Atiku Funmilayo Joy	atikufunmilayo4@gmail.com	07069145124	Edo state 	Benin city 	1767688938787-937528354.pdf	/storage/applications/1767688938787-937528354.pdf	I am interested in the position of a hotel hostess because I enjoy welcoming guests and creating a warm, pleasant first impression. I take pride in providing courteous service, assisting guests comfortably, and supporting smooth operations in a hospitality environment.	2026-01-06 08:42:19.629844
29	8	Adamu Hope Lattifat 	hopeadamu87@gmail.com	08082349152	Edo state 	Benin 	1767689985697-199990074.pdf	/storage/applications/1767689985697-199990074.pdf		2026-01-06 08:59:48.415984
30	8	Adamu Hope Lattifat 	hopeadamu87@gmail.com	08082349152	Edo state 	Benin 	1767690117757-384885386.pdf	/storage/applications/1767690117757-384885386.pdf		2026-01-06 09:01:58.559453
31	7	Adamu Hope Lattifat 	hopeadamu87@gmail.com	08082349152	Edo state 	Benin 	1767690303504-782457781.pdf	/storage/applications/1767690303504-782457781.pdf		2026-01-06 09:05:05.904054
32	7	Adamu Hope Lattifat 	hopeadamu87@gmail.com	08082349152	Edo state 	Benin city 	1767690406874-477767207.pdf	/storage/applications/1767690406874-477767207.pdf		2026-01-06 09:06:47.611141
33	9	JAPHET OKHUOYA 	japhetokhuoya423@gmail.com	07042587012	Edo	Benin	1767691892111-579951423.png	/storage/applications/1767691892111-579951423.png	Because is my area of specialisation 	2026-01-06 09:31:34.848659
34	8	Agbonifi Kingsley 	osamwonyiuyi@gmail.com	0701577188882	Edi	Benin city	1767699010535-561623738.jpg	/storage/applications/1767699010535-561623738.jpg	Because am qualified for the position 	2026-01-06 11:30:13.418896
35	7	Faith chioma enabulele 	faithikechi13@gmail.com	09048756545	Edo state 	Benin city 	1767699694743-909637088.pdf	/storage/applications/1767699694743-909637088.pdf	Because the Job is very important for me and with or without certificate I can perform extremely better, even far better than those with certificates because I want to save and move the hotel to the next level 	2026-01-06 11:41:35.448607
36	3	Uche melody 	melodyuche609@gmail.com	08117564609	Imo state 	Benin city 	1767704014132-644664020.jpg	/storage/applications/1767704014132-644664020.jpg	\r\nI am interested in the role of a kitchen assistant because I enjoy working in a fast-paced environment and supporting a team to deliver quality meals. I am hardworking, reliable, and willing to learn new kitchen skills while maintaining high standards of cleanliness and hygiene. I take instructions seriously and am always ready to assist wherever needed to help the kitchen operate smoothly.\r\n	2026-01-06 12:53:37.021281
37	8	Moses Blessed 	blessedminds29@gmail.com	07068341478	Edo	Benin 	1767704015233-774561709.docx	/storage/applications/1767704015233-774561709.docx	Because the of the true definition of the job	2026-01-06 12:53:37.583158
38	3	Uche melody 	melodyuche609@gmail.com	08117564609	Imo state 	Benin city 	1767704233672-125433953.jpg	/storage/applications/1767704233672-125433953.jpg	\r\nI am interested in the role of a kitchen assistant because I enjoy working in a fast-paced environment and supporting a team to deliver quality meals. I am hardworking, reliable, and willing to learn new kitchen skills while maintaining high standards of cleanliness and hygiene. I take instructions seriously and am always ready to assist wherever needed to help the kitchen operate smoothly.\r\n	2026-01-06 12:57:14.533126
39	2	Joy Oseghale	oseghalejoy947@gmail.com	07067394638	Edo	Benin 	1767710803767-952876506.pdf	/storage/applications/1767710803767-952876506.pdf	Am interested because I value being the first point of contact, responsible for delivering 5star impressions through warm welcomes and professional greetings. 	2026-01-06 14:46:44.628394
40	12	Samuel edet sereke	sammycome15@gmail.com	09155858481	Edo	Benin city 	1767722825158-55190931.pdf	/storage/applications/1767722825158-55190931.pdf	I have experienced about it and I love do the work 	2026-01-06 18:07:06.14908
41	9	Annabel Omosigho 	annabelomosigho414@gmail.com	07084896617	Edo state 	Benin city 	1767748192442-196295458.png	/storage/applications/1767748192442-196295458.png		2026-01-07 01:09:53.46319
42	13	Odigie Stanley Nunumwen Nofe	odigiestanley@gmail.com	8062108105	Edo state 	Benin city 	1767773541169-252393664.pdf	/storage/applications/1767773541169-252393664.pdf	Good morning sir/ma , I’m interested in this position to enable me bring my vast knowledge to the growth of the company and make sure the company attain that desired goal and purpose of the company. 	2026-01-07 08:12:22.03786
43	12	Muhammad-Kamil 	amkozigis717@gmail.com	08111931142	Kogi state 	Okene 	1767783968448-325018244.jpg	/storage/applications/1767783968448-325018244.jpg		2026-01-07 11:06:09.376168
44	2	Ezenwani Cynthia Ebube 	ezenwanicynthia2002@gmail.com	07040544121	Edo state 	Benin city 	1767790116294-89906177.pdf	/storage/applications/1767790116294-89906177.pdf		2026-01-07 12:48:37.156656
45	2	Ezenwani Cynthia Ebube 	ezenwanicynthia2002@gmail.com	07040544121	Edo state 	Benini city 	1767790339232-132885876.pdf	/storage/applications/1767790339232-132885876.pdf		2026-01-07 12:52:21.922861
46	9	Abuya Oseghale Goodluck 	abuyagoodluck24@gmail.com	09074915220	Edo state	Benin	1767793057545-369687011.pdf	/storage/applications/1767793057545-369687011.pdf	I have 1years experience in an eatery so I believe I can carry out the duties successful	2026-01-07 13:37:38.456662
47	6	Izevbizua osarobo 	osaroboizevbizua4@gmail.com	09132549753	Edo	Benin 	1767805645263-873816232.pdf	/storage/applications/1767805645263-873816232.pdf		2026-01-07 17:07:26.236434
48	11	Abigail Ezekiel 	abigailabok5@gmail.com	08100113406	Edo	Benin city	1767860268674-955953287.docx	/storage/applications/1767860268674-955953287.docx	Because, I have passion for the job and I no I can serve your company right 	2026-01-08 08:17:48.965173
49	5	Ijamani Nyerowo Cynthia 	ijamaninyerowocynthia@gmail.com	09020805158	Edo state 	Benin city 	1767880999145-606053256.pdf	/storage/applications/1767880999145-606053256.pdf	Love attending to people with a different people because that  is I love them	2026-01-08 14:03:20.014766
50	18	Ezenwani Cynthia Ebube 	ezenwanicynthia2002@gmail.com	07040544121	Edo state	Benin city	1767914011682-87211918.pdf	/storage/applications/1767914011682-87211918.pdf		2026-01-08 23:13:32.552221
51	3	Abasiama Michael Nkan	smartbarry26@gmail.com	07039257539	Akwa-ibom	Uyo	1767952958278-181612099.jpg	/storage/applications/1767952958278-181612099.jpg		2026-01-09 10:02:39.358762
52	1	Azubuike Prince 	omobaprince114@gmail.com	08168611189	Edo	Benin	1767970436881-404067168.jpeg	/storage/applications/1767970436881-404067168.jpeg		2026-01-09 14:53:57.809412
53	14	Azubuike Prince 	omobaprince114@gmail.com	08168611189	Edo	Benin	1767970688535-357629369.jpg	/storage/applications/1767970688535-357629369.jpg		2026-01-09 14:58:09.007502
54	20	Azubuike Prince 	omobaprince114@gmail.com	08168611189	Edo	Benin	1767970795932-547808849.jpg	/storage/applications/1767970795932-547808849.jpg		2026-01-09 14:59:56.338335
55	13	Azubuike Prince 	omobaprince114@gmail.com	08168611189	Edo	Benin	1767970911697-810234081.jpg	/storage/applications/1767970911697-810234081.jpg		2026-01-09 15:01:52.067517
56	8	Azubuike Prince 	omobaprince114@gmail.com	08168611189	Edo	Benin	1767971075522-957540001.jpg	/storage/applications/1767971075522-957540001.jpg		2026-01-09 15:04:35.898496
57	15	Azubuike Prince 	omobaprince114@gmail.com	08168611189	Edo	Benin	1767971207656-821734775.jpg	/storage/applications/1767971207656-821734775.jpg		2026-01-09 15:06:48.510513
58	18	Omije promise 	omijepromise@gmail.com	07056207461	Edo state	Benin city 	1767988537545-589823430.pdf	/storage/applications/1767988537545-589823430.pdf	I have passion for club	2026-01-09 19:55:39.432483
59	11	Christopher uche 	uchepromise360@gmail.com	07073060969	Edo state 	Benin city 	1767988773241-967767987.pdf	/storage/applications/1767988773241-967767987.pdf	I love making drink for consumers 	2026-01-09 19:59:34.536191
60	20	Omorodion Maxwell	maxwellomorodion0@gmail.com	07045611460	Edo	Benin	1768043230154-151180374.pdf	/storage/applications/1768043230154-151180374.pdf	I am applying for this role with strong interest and confidence.\r\nI hold a Bachelor’s degree in Agricultural Economics and Extension and have over four years of experience working as a supervisor, where I managed staff, daily operations, and customer service.\r\nI am organized, responsible, and people focused, with a strong desire to grow in the hospitality industry. I am ready to contribute positively and learn where needed.\r\nThank you for considering my application.	2026-01-10 11:07:11.01804
61	2	Ezenwani Cynthia Ebube 	ezenwanicynthia2002@gmail.com	07040544121	Edo state 	Benin city 	1768115386230-202183613.pdf	/storage/applications/1768115386230-202183613.pdf		2026-01-11 07:09:46.718401
62	2	Jennifer Ezenwani 	jenniferezenwani940@gmail.com	09061414683	Edo state 	Benin city	1768121347859-491464013.pdf	/storage/applications/1768121347859-491464013.pdf	I’m interested in this job cause i have passion for it,i have good communication skill and professional relationships with clients.I can proudly say I’m fit for this job	2026-01-11 08:49:08.675996
63	5	Jennifer Ezenwani 	jenniferezenwani940@gmail.com	09061414683	Edo state 	Benin city 	1768121508845-336100232.pdf	/storage/applications/1768121508845-336100232.pdf	I’m very attentive to instructions and satisfying clients 	2026-01-11 08:51:49.560171
64	2	Jennifer Ezenwani 	jenniferezenwani940@gmail.com	09061414683	Edo state 	Benin 	1768121611301-517185531.pdf	/storage/applications/1768121611301-517185531.pdf	I want to work,meet people and earn 	2026-01-11 08:53:31.987103
65	7	Jennifer Ezenwani 	jenniferezenwani940@gmail.com	09061414683	Edo state 	Benin 	1768121740330-445356921.pdf	/storage/applications/1768121740330-445356921.pdf	I have good communication skills,professional relationships with people attentive to other so I can make good use of it for this job 	2026-01-11 08:55:43.103218
66	3	Abasiama Michael Nkan 	smartbarry26@gmail.com	07039257539	Akwa ibom	Uyo	1768144567717-634296436.jpg	/storage/applications/1768144567717-634296436.jpg	This is because I'm good in keeping the kitchen clean 	2026-01-11 15:16:08.538829
67	20	Yusuf Victory Osereme 	vickyosas112@gmail.com	09034268815	Edo 	Benin 	1768159053513-677771169.pdf	/storage/applications/1768159053513-677771169.pdf		2026-01-11 19:17:36.539527
68	13	Ebohon Joan osasere	joanebohon2@gmail.com	08151106092	Edo	Benin	1768175591835-119328473.pdf	/storage/applications/1768175591835-119328473.pdf	I’m interested in this role because it is my area of expertise and I’m working to support myself 	2026-01-11 23:53:14.665497
69	20	Ebohon Joan Osasere 	joanebohon2@gmail.com	08151106092	Edo	Benin	1768175676003-22056113.pdf	/storage/applications/1768175676003-22056113.pdf		2026-01-11 23:54:38.38662
\.


--
-- Data for Name: job_postings; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.job_postings (id, title, company, description, requirements, location, state, city, category, is_published, created_at) FROM stdin;
1	HR manager	Empleo System Limited	*Payroll preparation\n*HR management\n* Monthly Payee Filing	*BSc in any Management course\n*4 years Experience	Benin City, Nigeria	Edo	Benin City	HUman Resources	t	2025-12-24 17:36:34.296658
5	Waitress	Private Company	*Welcome guests and take food/drink orders politely\n*Serve meals and drinks accurately and on time\n*Know the menu and make recommendations when needed\n*Keep tables and service area clean and organized\n*Handle guest complaints calmly and report issues to supervisor	*OND minimum\n*Good communication and customer service skills\n*Neat, polite, and professional appearance\n*Ability to work night shifts/weekends and stand long hours\n*Experience in hospitality is an advantage\n\n\nREMUNERATION\nSalary: N100,000	Edo, Nigeria	Edo State	Benin	Hospitality	t	2025-12-29 10:41:28.790417
7	Receptionist	Private (Hotel)	*Receives guests\n*Answers calls\n*Manages reservations/check-ins\n*Handles basic enquiries\n*Keeps records\n*Supports front-desk cash/transfer/POS where required\n*Maintains a neat reception area.	*Minimum OND \n*Good spoken and written English\n*Basic computer skills (typing, email, Excel/Word)\n*Strong customer service and phone etiquette\n*Neat appearance and professional attitude\n*Ability to handle payments/receipts (cash, transfer, POS)\n*Calm under pressure, punctual, and trustworthy\n\n\nREMUNERATION\nSalary: N80,000 - N100,00	Ugbor, Benin City	Edo State	Benin City	Hospitality	f	2026-01-05 11:08:45.525613
6	Supervisor 	Private (Hotel)	*Staff Leadership: Creating shift schedules, assigning tasks, and supervising performance. They are often responsible for training new hires on hotel software and service standards.\n*Guest Relations: Handling escalated guest complaints, processing VIP arrivals, and ensuring that any special requests (e.g., anniversary surprises or accessibility needs) are met.\n*Operational Oversight: Monitoring room availability, managing check-ins/check-outs, and conducting "walk-throughs" to ensure public areas and rooms meet cleanliness and safety standards.\n*Financial Duties: Handling cash drawers, performing shift audits, and occasionally assisting with inventory ordering for supplies like linens or toiletries.\n*Safety & Compliance: Ensuring the team follows health and safety regulations, including fire safety protocols and emergency procedures.	Skill Category        \tEssential Qualities\nTechnical:\t            Proficiency in Property Management Systems (PMS) like Opera or Cloudbeds; basic accounting.\nInterpersonal:\t        High emotional intelligence for conflict resolution; clear verbal and written communication.\nOperational:         \tStrong multitasking abilities and the capacity to stay calm under high-pressure situations.\nEducation:\t            A high school diploma + 2–3 years of experience, or a Bachelor's degree in Hospitality.\n\n\nRemuneration \nSalary, 100,000	Obe, Sapele Road, Benin,  Nigeria 	Edo 	Benin 	Admin/Operations 	t	2026-01-02 09:35:39.7298
2	Club Hostess	Private Company	* Welcome and seat guests politely\n*Manage reservations and walk-ins\n*Assist guests with basic inquiries and direct issues to management\n*Coordinate with security and service staff to ensure smooth guest flow\n*Maintain a neat front-of-house and professional appearance	*OND minimum\n*Good communication and customer service skills\n*Neat, confident, and respectful\n*Able to work night shifts, weekends, and stand for long hours\n*Experience in hospitality is an advantage\n\n\nREMUNERATION\nSalary: N100,000	Edo, Nigeria	Edo State	Benin City	Hospitality	t	2025-12-29 10:16:58.502713
3	Kitchen Assistant	Private Company	*Support chefs with basic food prep (washing, cutting, measuring)\n*Keep the kitchen clean (dishes, surfaces, floors, waste disposal)\n*Arrange ingredients, tools, and supplies for cooking\n*Assist with packing and plating as directed\n*Follow hygiene and safety rules at all times	*OND minimum\n*Basic knowledge of kitchen hygiene and food handling\n*Ability to work fast under pressure and follow instructions\n*Physically fit (standing long hours, lifting light items)\n*Experience in a kitchen is an advantage\n\n\n\nREMUNERATION\nSalary: N80,000	Edo, Nigeria	Edo State	Benin	Food and Beverage	t	2025-12-29 10:32:22.726571
9	Waitstaff	Private (Hotel)	*Takes orders\n*Serves food/drinks\n*Checks on guests\n*Processes payments\n*Clears tables\n*Keeps the service area clean.	*Minimum OND\n*Good communication and friendly attitude\n*Basic knowledge of food and drinks; fast learner\n*Ability to stand/walk for long hours\n*Good grooming and neat appearance\n*Ability to take orders accurately and handle payments\n*Teamwork, speed, and ability to work under pressure\n\n\n\nREMUNERATION\nSALARY: N80,000-N100,000\n	1st Ugbor, Edo State, Nigeria	Edo	Benin City	Hospitality	t	2026-01-05 11:32:19.056049
8	Supervisor	Private (Hotel)	*Leads the shift\n*Assigns tasks\n*Monitors service quality\n*Handles complaints\n*Enforces SOPs\n*Submits daily/shift reports.	*Minimum OND\n*1–3 years supervisory experience in hospitality/retail preferred\n*Strong leadership, communication, and problem-solving skills\n*Ability to manage staff schedules and enforce SOPs\n*Basic reporting skills (Excel/Google Sheets is a plus)\n*Good conflict resolution and customer handling skills\n*High integrity, accountability, and attention to detail\n\n\n\nREMUNERATION\nSalary: N80,000 - N100,00	Ugbor, Benin City	Edo State	Benin City	Hospitality	f	2026-01-05 11:24:18.780622
4	Chef	Private Company	*Prepare and cook meals according to the menu and standards\n*Ensure food quality, taste, and proper presentation\n*Maintain kitchen hygiene and food safety at all times\n*Manage ingredients, stock, and reduce food waste\n*Supervise kitchen staff and coordinate orders during service	*OND minimum (Culinary training is an advantage)\n*Proven cooking experience in a restaurant/lounge/club\n*Knowledge of food safety and kitchen hygiene\n*Ability to work under pressure and meet timelines\n*Good teamwork and leadership skills\n\n\nREMUNERATION\nSalary: N150,000\n\n\n	Ekae, Sapele Road	Edo State	Benin 	Food and Beverages	t	2025-12-29 10:37:19.022459
10	Cook	Private (Hotel)	*Prepares meals to standard recipes.\n*Ensures quality and speed.\n*Maintains kitchen cleanliness.\n*Manages ingredients properly.\n*Follows food safety rules.	*Minimum OND; catering/culinary training is an advantage\n*Proven cooking experience \n*Knowledge of kitchen hygiene and food safety\n*Ability to follow recipes and maintain consistent taste/quality\n*Speed, organization, and ability to work under pressure\n*Good teamwork and communication in the kitchen\n*Willingness to work shifts, weekends, and peak periods\n\n\n\nREMUNERATION\nSALARY:N80,000	Ugbor, Benin City	Edo State	Benin City	Foods and Beverages	t	2026-01-05 11:38:56.861484
15	Publicity/Product Manager	Private Company	*Plans and executes marketing strategies for products/services.\n*Manages campaigns (online/offline).\n*Drives customer acquisition and retention.\n*Oversees branding/content, \n*Tracks performance, \n*Works with sales to grow revenue.\n	*BSc/HND in marketing, business, or related field.\n*Experience in product marketing/digital marketing.\n*Strong strategy, creativity, and execution skills.\n*Knowledge of social media ads, content marketing, and analytics.\n*Excellent communication, writing, and presentation skills.\n*Ability to research market/customer needs and position offers.\n*Strong reporting skills and results-driven mindset.\n\n\n\nREMUNERATION\nSALARY: N125,000	Ugbor, Benin City. 	Edo	Benin City	Marketing	t	2026-01-05 14:01:00.886788
14	Admin Manager	Private Company	*Manages administrative processes.\n*Documentation.\n*Staff records.\n*Procurement support.\n*Vendor coordination.\n*Office supplies.\n*Compliance documentation.\n*Supports management with reports and scheduling.	*HND/BSc (admin/management or related field).\n*2–4 years admin/office management experience.\n*Strong documentation and record-keeping skills.\n*Good communication and coordination skills.\n*Ability to handle confidential information professionally.\n*Organized, detail-oriented, and dependable.\n\n\n\nREMUNERATION\nSALARY: N105,000	Ugbor, Benin City.	Edo	Benin City	Administration	t	2026-01-05 12:31:37.026096
13	Operational Manager	Private Company	*Oversees daily operations.\n*Coordinates departments.\n*Ensures service standards.\n*Manages staff performance and schedules.\n*Controls costs/inventory.\n*Resolves escalated issues\n*Delivers operational reports.	*HND/BSc (business/hospitality or related field preferred).\n*Operations/management experience (hospitality/retail preferred).\n*Strong leadership, planning, and problem-solving skills.\n*Knowledge of SOPs, customer service, and compliance.\n*Budgeting, inventory, and basic financial control skills.\n*Strong reporting skills (Excel/Google Sheets).\n*High integrity, accountability, and ability to work under pressure.\n\n\n\nREMUNERATION\nSALARY: N200,000	Ugbor, Benin City	Edo	Benin City	Business Operations	t	2026-01-05 12:08:53.237399
17	Traffic Controller	Private (Club)	*Guide vehicles entering, moving within, and exiting the premises.\n*Control turning, stopping, and parking to avoid congestion.\n*Allocate parking spaces and ensure orderly parking.\n*Keep access roads, entrances, emergency routes, and loading areas clear.\n*Use hand signals, reflective vests, cones, signs, whistles, or traffic wands (where provided).\n*Set up and remove cones/barriers when required.\n\n	*Minimum of SSCE or equivalent qualification.\n*Previous experience in traffic control, parking management, security, or similar crowd-control role is an advantage.\n*Ability to communicate clearly and politely with drivers and guests.\n*Good knowledge of basic road safety rules and safe directing signals.\n*Ability to work as part of a team with security, reception, and operations staff.\n*Punctual, disciplined, and able to follow instructions and venue procedures strictly.\n\n\n\nREMUNERATION\nSALARY: N60,000\n	Boundary, Gra	Edo	Benin City	Security	t	2026-01-07 15:43:31.731818
12	Shisha Attendant	Private Company	*Sets up and prepares shisha.\n*Attends to guest preferences.\n*Maintains cleanliness of shisha area/equipment.\n*Replaces coal safely.\n*Ensures a smooth customer experience.	*OND minimum.\n*Experience as a shisha attendant is an advantage.\n*Good knowledge of flavours, setup, and hygiene practices.\n*Careful handling of hot coal and safety awareness.\n*Neat appearance and good customer relations.\n*Ability to work fast under pressure.\n*Willingness to work late shifts and weekends.\n\n\n\nREMUNERATION\nSALARY: N100,000	Ugbor, Benin City	Edo	Benin City	Hospitality	t	2026-01-05 11:53:27.133458
16	Backend Engineer  (Node.js API, DB Performance, Session/Auth)	Empleo System limited 	*Diagnose and fix intermittent “timeout exceeded when trying to connect” errors\n\n*Audit and optimize PostgreSQL usage (pooling, indexes, query plans, migrations)\n\n*Fix session/auth stability in production (cookies/proxy settings, session store reliability)\n\n*Implement production monitoring + logging (slow routes, errors, health checks)\n\n*Hardening multi-tenant data isolation (no data leak across owners/tenants)\n\n*Improve API performance for key endpoints (clients, SRD ledgers, stock movements)\n\n*Review deployment pipeline (dev → prod parity, env vars, DB migrations safety)	*Node.js + TypeScript (Express/Nest/Next API)\nPostgreSQL (schema design, indexing, query optimization)\n\n*Connection pooling and timeouts (pg, knex/drizzle/prisma)\n\n*Sessions/auth (cookie settings, reverse proxy, SameSite/Secure, trust proxy)\n\n*Production debugging (logs, traces, performance profiling)\nMulti-tenant SaaS patterns (orgId scoping, RBAC)\n\n*Cloud/Replit deployment familiarity OR willingness to learn quickly	Benin City 	Edo	Benin City	Developer 	t	2026-01-05 14:48:11.362466
19	Accounting Clerk	Private Company	*Recording daily transactions into accounting software.\n*Processing vendor invoices and preparing payments.\n*Issuing customer invoices and tracking collections.\n*Matching bank statements with internal ledgers to find errors.\n*Maintaining financial records and assisting with audits.	*ND Minimum\n*Strong skills in spreadsheets (formulas and data organization).\n*High comfort level with numbers and basic calculations.\n*Extreme attention to detail, integrity, and organizational skills.\n\n\n\n\nREMUNERATION\nSALARY: N100,000	Obe, Sapele road	Edo	Benin City	Finance	t	2026-01-08 11:38:50.126546
20	Hotel Manager	Private Company	*Oversee all departments, including front office, housekeeping, maintenance, and food & beverage.\n*Manage budgets, analyze financial reports, and implement pricing strategies to maximize revenue and occupancy.\n*Ensure the property meets all health, safety, and brand standards through regular inspections.\n*Recruit, train, and mentor department heads and staff; foster a positive and inclusive work culture.\n*Handle escalated guest complaints and proactively seek feedback to improve service.	*Strong ability to manage diverse teams and solve complex problems under pressure.\n*Proficiency in revenue management and budgeting.\n*Exceptional verbal and written skills for interacting with guests, staff, and stakeholders\n*Minumium of 3 Years experience.\n\n\n\n\nREMUNERATION\nSALARY: N150,000	Obe, Sapele road	Edo	Benin City	Hospitality	t	2026-01-09 12:39:18.364384
11	Mixologist	Private Company	*Prepares and serves cocktails and beverages.\n*Maintains bar setup and cleanliness. \n*Manages drink inventory.\n*Ensures consistent taste/quality.\n*Delivers excellent guest service.	*OND minimum.\n*Proven bar/mixology experience.\n*Knowledge of cocktails, spirits, and beverage presentation.\n*Good hygiene, speed, and attention to detail.\n*Strong customer service and communication skills.\n*Ability to manage stock and minimize wastage.\n*Willingness to work nights, weekends, and peak periods.\n\n\n\nREMUNERATION\nSALARY: N150,000	Ugbor, Benin City	Edo	Benin City	Hospitality	f	2026-01-05 11:48:39.020581
21	Receptionist	Private (Hotel)	*Greet guests, manage the check-in/check-out process, and handle room assignments.\n*Manage bookings via phone, email, and online systems.\n*Provide information on room rates and availability.\n*Process payments, maintain accurate guest records, and coordinate with housekeeping for room status updates.\n*Resolve minor guest issues immediately and with a helpful attitude.	*ND Minimum.\n*A warm, professional demeanor and the ability to multitask in a fast-paced environment.\n*Strong attention to detail regarding billing and guest preferences.\n*Fluency in English.\n*Great Communication skills.\n\n\n\nREMUNERATION\nSALARY: N80,000	Obe, Sapele road.	Edo	Benin City	Hospitality	t	2026-01-09 12:46:34.998102
18	Club Hostess	Private	*Welcome and seat guests politely\n*Manage reservations and walk-ins\n*Assist guests with basic inquiries and direct issues to management\n*Coordinate with security and service staff to ensure smooth guest flow\n*Maintain a neat front-of-house and professional appearance	*BSC/OND Minimum\n*Good communication and customer service skills\n*Neat, polite, and professional appearance\n*Ability to work night shifts/weekends and stand long hours\n*Experience in hospitality is an advantage\n\n\n\n\nREMUNERATION\nSALARY: N100,000\n\n	Boundary, GRA	Edo	Benin City	Hospitality	f	2026-01-07 15:55:49.581639
\.


--
-- Data for Name: service_requests; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.service_requests (id, title, full_name, email, phone, state, city, user_status, organization_name, service, description, documents, status, created_at) FROM stdin;
3	Mr	Nwigwe Chigozie Uzziah	nwigwechigozie35@gmail.com	08169790726	Edo	Benin	candidate		Recruitment	Available and ready for employment. I am a certified HR manager and customer care personel.	[]	pending	2026-01-07 20:39:20.656926
4	Mrs	Mrs Kingsley sandra	iyekowasand1@gmail.com	09164836441	Edo	Benin	candidate		Training & Development	Training for HR management 	[]	pending	2026-01-10 08:34:20.590756
5	Miss	PRAISE OGHOSA	oghosapraise444@gmail.com	08143252672	EDO	BENIN	candidate		HR Consultancy	For human resources training	[]	pending	2026-01-10 23:22:38.22699
2	Miss	Okoro Ruth Chiadikaobi 	okororuth51@gmail.com	08101103072	Edo	Benin	candidate		Recruitment	To work as a hostess in a reputable lounge/club	[]	approved	2026-01-02 10:01:46.126884
6	Miss	Orumwensodia Fatimo Sylvia 	smartsylvia2017@gmail.com	07041301184	Edo State 	Benin City 	candidate		Recruitment	I want to apply for the post of a waitress in a club. 	[]	pending	2026-01-12 07:35:48.00742
\.


--
-- Data for Name: templates; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.templates (id, title, description, filename, file_url, file_type, is_published, created_at) FROM stdin;
2	GOODS RECEIVED NOTE (GRN)	A Goods Received Note (GRN) is an internal document used by a business to confirm that a delivery from a supplier has arrived and has been officially accepted.	1766654788327-458058457.pdf	/uploads/1766654788327-458058457.pdf	pdf	t	2025-12-25 09:26:30.876155
3	BIN CARD	A Bin Card (also known as a Stock Card or Bin Tag) is a physical or digital record used in a warehouse to track the movement of a specific item at its exact storage location (its "bin").	1766654894394-519925401.pdf	/uploads/1766654894394-519925401.pdf	pdf	t	2025-12-25 09:28:14.932168
\.


--
-- Data for Name: training_requests; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.training_requests (id, full_name, email, phone, employment_status, organization_name, role, interested_training, preferred_start_date, certification_required, verified_shortlist, status, created_at) FROM stdin;
1	Erhabor imuetiyan Grace 	imuetiyangrace@gmail.com	08136407089	Employed 	School 	Teacher 	HR management 	2025-12-30	f	f	contacted	2025-12-30 11:44:15.538018
2	Emedoge philomina	emedogep@gmail.com	07084568301	Unemployed 	\N	\N	Administrative 	2026-01-05	t	t	contacted	2025-12-30 18:17:01.273287
4	Supreme Esezobor Omohimen	foreversuperiorr@gmail.com	09129000733	\N	\N	\N	Employees Relations 	2026-01-12	t	f	contacted	2026-01-07 10:04:23.9375
3	Obianke Bima Goodness 	bimaobiankegoodness@gmail.com	09054926544 	\N	\N	\N	H R 	2026-01-05	t	t	contacted	2026-01-04 17:25:23.780581
5	Akinlade Umemene Cordelia 	switcord157@gmail.com	+2348131659818	Unemployed 	\N	\N	HR Management 	2026-01-10	t	t	contacted	2026-01-07 21:50:17.717272
6	Maigeri Benedict 	maigeribenedict@gmail.com	08136185135	\N	\N	\N	HR management 	\N	t	t	contacted	2026-01-08 16:39:03.85068
7	Akinlade Umemene Cordelia 	cordeliaakinlade@gmail.com	+2347059101706	Unemployed 	\N	\N	HR Management 	2026-01-12	t	t	contacted	2026-01-09 07:36:59.728417
8	Esther Odibo	odiboesther9@gmail.com	+2348141389481	Employed	FORAGE	HR/Admin	Everything HR management 	\N	t	f	contacted	2026-01-09 12:56:39.818874
10	Mrs Kingsley sandra	iyekowasand1@gmail.com	09164836441	 Unemployed	Non	Non	HR management 	2026-01-12	t	f	contacted	2026-01-10 08:31:23.870525
18	Abasiama Michael Nkan 	smartbarry26@gmail.com	+23407039257539	\N	Anyone 	Kitchen assistance 	I don't understand 	2026-01-12	f	f	reviewed	2026-01-11 05:10:24.387734
17	PRAISE OGHOSA	oghosapraise444@gmail.com	08143252672	Unemployed	\N	\N	HR management	2026-01-12	t	t	contacted	2026-01-10 23:24:56.85639
16	Nanaishat Momodu	aishamomodu4@gmail.com	08055984345	Employed	\N	Entrepreneurship 	HR Management 	2026-01-12	t	f	contacted	2026-01-10 21:59:09.947013
15	Maigeri Benedict kehinde	maigeribenedict@gmail.com	08136185135	\N	\N	\N	HR management 	\N	t	t	contacted	2026-01-10 16:51:55.57895
14	Ademiju Adeola 	adeolaademiju14@gmail.com	08163795022	Employed	AAJ EXPRESS LOGISTICS 	ECA 	HR management, Recruitment, labour laws	2026-01-19	t	t	contacted	2026-01-10 15:36:10.578806
13	Dennis Ereyi 	dennisereyi@gmail.com	09033669154	Employed	MegaHub Benin	Restaurant Manager	HR management 	2026-01-12	t	f	reviewed	2026-01-10 11:54:38.583096
12	Anthonia Igiebor 	igieborosasuyi9@gmail.com	08066308246	Unemployed 	\N	\N	HR Management 	2026-01-19	t	t	contacted	2026-01-10 09:03:14.621524
11	Izevbizua Murphy 	imademurphy@gmail.com	08101050775	Employed	Quid Lounge	Manager	HR management 	2026-01-12	t	t	contacted	2026-01-10 08:31:56.816177
9	Wuru Emmanuel Alese	wurualese519@gmail.com	+2348102931459	Unemployed 	XSemiboss employment Agency 	MD/CEO 	HR MANAGEMENT 	2026-01-20	t	f	contacted	2026-01-10 08:13:23.79108
19	Osafile Mary Fidelia	maryfidelia3085@gmail.com	+2349038063085	Unemployed	\N	\N	HR management 	2026-01-12	f	t	contacted	2026-01-12 07:04:00.064931
20	Oghogho isaac	oghoghoisaac72@gmail.com	+2348161819495	Employed	I-Tech services	Md	HR management	2026-01-16	t	t	new	2026-01-12 12:43:49.999533
\.


--
-- Data for Name: verified_candidates; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.verified_candidates (id, full_name, title, company, service, bio, image_url, status, created_at) FROM stdin;
3	AISOSA JONATHAN	Software Developer	Empleo System Limited	Candidate Verification	Full Stack Developer	/uploads/1766654453261-575752874.jpg	rejected	2025-12-25 09:20:53.500875
\.


--
-- Name: replit_database_migrations_v1_id_seq; Type: SEQUENCE SET; Schema: _system; Owner: neondb_owner
--

SELECT pg_catalog.setval('_system.replit_database_migrations_v1_id_seq', 3, true);


--
-- Name: content_items_display_order_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.content_items_display_order_seq', 22, true);


--
-- Name: content_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.content_items_id_seq', 22, true);


--
-- Name: job_applications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.job_applications_id_seq', 69, true);


--
-- Name: job_applications_job_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.job_applications_job_id_seq', 1, false);


--
-- Name: job_postings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.job_postings_id_seq', 21, true);


--
-- Name: service_requests_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.service_requests_id_seq', 6, true);


--
-- Name: templates_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.templates_id_seq', 3, true);


--
-- Name: training_requests_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.training_requests_id_seq', 20, true);


--
-- Name: verified_candidates_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.verified_candidates_id_seq', 3, true);


--
-- Name: replit_database_migrations_v1 replit_database_migrations_v1_pkey; Type: CONSTRAINT; Schema: _system; Owner: neondb_owner
--

ALTER TABLE ONLY _system.replit_database_migrations_v1
    ADD CONSTRAINT replit_database_migrations_v1_pkey PRIMARY KEY (id);


--
-- Name: content_items content_items_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.content_items
    ADD CONSTRAINT content_items_pkey PRIMARY KEY (id);


--
-- Name: job_applications job_applications_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.job_applications
    ADD CONSTRAINT job_applications_pkey PRIMARY KEY (id);


--
-- Name: job_postings job_postings_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.job_postings
    ADD CONSTRAINT job_postings_pkey PRIMARY KEY (id);


--
-- Name: service_requests service_requests_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.service_requests
    ADD CONSTRAINT service_requests_pkey PRIMARY KEY (id);


--
-- Name: templates templates_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.templates
    ADD CONSTRAINT templates_pkey PRIMARY KEY (id);


--
-- Name: training_requests training_requests_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.training_requests
    ADD CONSTRAINT training_requests_pkey PRIMARY KEY (id);


--
-- Name: verified_candidates verified_candidates_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.verified_candidates
    ADD CONSTRAINT verified_candidates_pkey PRIMARY KEY (id);


--
-- Name: idx_replit_database_migrations_v1_build_id; Type: INDEX; Schema: _system; Owner: neondb_owner
--

CREATE UNIQUE INDEX idx_replit_database_migrations_v1_build_id ON _system.replit_database_migrations_v1 USING btree (build_id);


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO neon_superuser WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON TABLES TO neon_superuser WITH GRANT OPTION;


--
-- PostgreSQL database dump complete
--

\unrestrict qvuQF8hRfniCLTHLudZl3b0Sjk3bsHw0Cwn9of0eh4dIO3fgBTWKfaCdBIzWdaE

