--
-- PostgreSQL database dump
--

\restrict lUE8bKv5m79a7E3hHLYrZiAr6aXp0sPplZwvtdmPUqd9wiqGs1UXsE3TRUMhzZk

-- Dumped from database version 18.4
-- Dumped by pg_dump version 18.4

-- Started on 2026-08-26 16:57:09

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 228 (class 1259 OID 33941)
-- Name: ai_predictions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ai_predictions (
    id integer NOT NULL,
    scan_id integer NOT NULL,
    input_type character varying(100) NOT NULL,
    prediction character varying(150) NOT NULL,
    confidence double precision NOT NULL,
    model_name character varying(100) NOT NULL,
    created_at timestamp without time zone NOT NULL
);


ALTER TABLE public.ai_predictions OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 33940)
-- Name: ai_predictions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ai_predictions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ai_predictions_id_seq OWNER TO postgres;

--
-- TOC entry 5102 (class 0 OID 0)
-- Dependencies: 227
-- Name: ai_predictions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ai_predictions_id_seq OWNED BY public.ai_predictions.id;


--
-- TOC entry 232 (class 1259 OID 33982)
-- Name: reports; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reports (
    id integer NOT NULL,
    scan_id integer NOT NULL,
    scan_summary text,
    security_findings text,
    ai_analysis text,
    intrusion_analysis text,
    recommendations text,
    created_at timestamp without time zone NOT NULL
);


ALTER TABLE public.reports OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 33981)
-- Name: reports_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reports_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.reports_id_seq OWNER TO postgres;

--
-- TOC entry 5103 (class 0 OID 0)
-- Dependencies: 231
-- Name: reports_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reports_id_seq OWNED BY public.reports.id;


--
-- TOC entry 230 (class 1259 OID 33961)
-- Name: risk_scores; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.risk_scores (
    id integer NOT NULL,
    scan_id integer NOT NULL,
    severity_score double precision NOT NULL,
    ai_confidence double precision NOT NULL,
    impact_score double precision NOT NULL,
    final_score double precision NOT NULL,
    priority character varying(50) NOT NULL,
    created_at timestamp without time zone NOT NULL
);


ALTER TABLE public.risk_scores OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 33960)
-- Name: risk_scores_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.risk_scores_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.risk_scores_id_seq OWNER TO postgres;

--
-- TOC entry 5104 (class 0 OID 0)
-- Dependencies: 229
-- Name: risk_scores_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.risk_scores_id_seq OWNED BY public.risk_scores.id;


--
-- TOC entry 234 (class 1259 OID 34002)
-- Name: scan_results; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.scan_results (
    id integer NOT NULL,
    scan_id integer NOT NULL,
    result_type character varying(100) NOT NULL,
    title character varying(255) NOT NULL,
    description text,
    raw_data text,
    created_at timestamp without time zone NOT NULL
);


ALTER TABLE public.scan_results OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 34001)
-- Name: scan_results_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.scan_results_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.scan_results_id_seq OWNER TO postgres;

--
-- TOC entry 5105 (class 0 OID 0)
-- Dependencies: 233
-- Name: scan_results_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.scan_results_id_seq OWNED BY public.scan_results.id;


--
-- TOC entry 224 (class 1259 OID 33900)
-- Name: scans; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.scans (
    id integer NOT NULL,
    user_id integer NOT NULL,
    target character varying(500) NOT NULL,
    scan_type character varying(100) NOT NULL,
    status character varying(50) NOT NULL,
    started_at timestamp without time zone,
    completed_at timestamp without time zone,
    summary text
);


ALTER TABLE public.scans OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 33899)
-- Name: scans_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.scans_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.scans_id_seq OWNER TO postgres;

--
-- TOC entry 5106 (class 0 OID 0)
-- Dependencies: 223
-- Name: scans_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.scans_id_seq OWNED BY public.scans.id;


--
-- TOC entry 222 (class 1259 OID 33887)
-- Name: traffic_logs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.traffic_logs (
    id integer NOT NULL,
    source_ip character varying(100),
    method character varying(20),
    endpoint character varying(500),
    status_code integer,
    user_agent text,
    classification character varying(50) NOT NULL,
    confidence double precision,
    created_at timestamp without time zone NOT NULL
);


ALTER TABLE public.traffic_logs OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 33886)
-- Name: traffic_logs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.traffic_logs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.traffic_logs_id_seq OWNER TO postgres;

--
-- TOC entry 5107 (class 0 OID 0)
-- Dependencies: 221
-- Name: traffic_logs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.traffic_logs_id_seq OWNED BY public.traffic_logs.id;


--
-- TOC entry 220 (class 1259 OID 33869)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(100) NOT NULL,
    email character varying(255) NOT NULL,
    password_hash character varying(255) NOT NULL,
    is_active boolean NOT NULL,
    created_at timestamp without time zone NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 33868)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 5108 (class 0 OID 0)
-- Dependencies: 219
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 226 (class 1259 OID 33920)
-- Name: vulnerabilities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.vulnerabilities (
    id integer NOT NULL,
    scan_id integer NOT NULL,
    type character varying(150) NOT NULL,
    severity character varying(50) NOT NULL,
    confidence double precision,
    description text,
    recommendation text,
    status character varying(50) NOT NULL,
    created_at timestamp without time zone NOT NULL
);


ALTER TABLE public.vulnerabilities OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 33919)
-- Name: vulnerabilities_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.vulnerabilities_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.vulnerabilities_id_seq OWNER TO postgres;

--
-- TOC entry 5109 (class 0 OID 0)
-- Dependencies: 225
-- Name: vulnerabilities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.vulnerabilities_id_seq OWNED BY public.vulnerabilities.id;


--
-- TOC entry 4895 (class 2604 OID 33944)
-- Name: ai_predictions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ai_predictions ALTER COLUMN id SET DEFAULT nextval('public.ai_predictions_id_seq'::regclass);


--
-- TOC entry 4897 (class 2604 OID 33985)
-- Name: reports id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reports ALTER COLUMN id SET DEFAULT nextval('public.reports_id_seq'::regclass);


--
-- TOC entry 4896 (class 2604 OID 33964)
-- Name: risk_scores id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.risk_scores ALTER COLUMN id SET DEFAULT nextval('public.risk_scores_id_seq'::regclass);


--
-- TOC entry 4898 (class 2604 OID 34005)
-- Name: scan_results id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.scan_results ALTER COLUMN id SET DEFAULT nextval('public.scan_results_id_seq'::regclass);


--
-- TOC entry 4893 (class 2604 OID 33903)
-- Name: scans id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.scans ALTER COLUMN id SET DEFAULT nextval('public.scans_id_seq'::regclass);


--
-- TOC entry 4892 (class 2604 OID 33890)
-- Name: traffic_logs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.traffic_logs ALTER COLUMN id SET DEFAULT nextval('public.traffic_logs_id_seq'::regclass);


--
-- TOC entry 4891 (class 2604 OID 33872)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 4894 (class 2604 OID 33923)
-- Name: vulnerabilities id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vulnerabilities ALTER COLUMN id SET DEFAULT nextval('public.vulnerabilities_id_seq'::regclass);


--
-- TOC entry 5090 (class 0 OID 33941)
-- Dependencies: 228
-- Data for Name: ai_predictions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ai_predictions (id, scan_id, input_type, prediction, confidence, model_name, created_at) FROM stdin;
\.


--
-- TOC entry 5094 (class 0 OID 33982)
-- Dependencies: 232
-- Data for Name: reports; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reports (id, scan_id, scan_summary, security_findings, ai_analysis, intrusion_analysis, recommendations, created_at) FROM stdin;
\.


--
-- TOC entry 5092 (class 0 OID 33961)
-- Dependencies: 230
-- Data for Name: risk_scores; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.risk_scores (id, scan_id, severity_score, ai_confidence, impact_score, final_score, priority, created_at) FROM stdin;
\.


--
-- TOC entry 5096 (class 0 OID 34002)
-- Dependencies: 234
-- Data for Name: scan_results; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.scan_results (id, scan_id, result_type, title, description, raw_data, created_at) FROM stdin;
1	1	string	string	string	string	2026-08-25 16:50:01.470444
2	1	string	string	string	string	2026-08-25 16:55:55.549205
\.


--
-- TOC entry 5086 (class 0 OID 33900)
-- Dependencies: 224
-- Data for Name: scans; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.scans (id, user_id, target, scan_type, status, started_at, completed_at, summary) FROM stdin;
1	2	http://localhost:3000	security_scan	pending	2026-08-25 16:11:32.385793	\N	\N
\.


--
-- TOC entry 5084 (class 0 OID 33887)
-- Dependencies: 222
-- Data for Name: traffic_logs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.traffic_logs (id, source_ip, method, endpoint, status_code, user_agent, classification, confidence, created_at) FROM stdin;
\.


--
-- TOC entry 5082 (class 0 OID 33869)
-- Dependencies: 220
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, email, password_hash, is_active, created_at) FROM stdin;
1	testuser	testuser@example.com	$argon2id$v=19$m=65536,t=3,p=4$tU7xueab4ekm5iwdmhpFxg$J7b4jUiV+6tmftn7OQ32oC2/XO4qQMhuFr6x8B8LqTA	t	2026-08-25 16:00:33.443678
2	test	test@example.com	$argon2id$v=19$m=65536,t=3,p=4$hRKCmGhyr4y07KScK87XLA$UXynCpjI/xMrWFEqRcBDHolOLEk/qSBt01gHnn6Ah2I	t	2026-08-25 16:01:33.11165
\.


--
-- TOC entry 5088 (class 0 OID 33920)
-- Dependencies: 226
-- Data for Name: vulnerabilities; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.vulnerabilities (id, scan_id, type, severity, confidence, description, recommendation, status, created_at) FROM stdin;
1	1	string	string	0	string	string	open	2026-08-25 16:54:55.908134
2	1	string	string	0	string	string	open	2026-08-25 16:56:23.641013
\.


--
-- TOC entry 5110 (class 0 OID 0)
-- Dependencies: 227
-- Name: ai_predictions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ai_predictions_id_seq', 1, false);


--
-- TOC entry 5111 (class 0 OID 0)
-- Dependencies: 231
-- Name: reports_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reports_id_seq', 1, false);


--
-- TOC entry 5112 (class 0 OID 0)
-- Dependencies: 229
-- Name: risk_scores_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.risk_scores_id_seq', 1, false);


--
-- TOC entry 5113 (class 0 OID 0)
-- Dependencies: 233
-- Name: scan_results_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.scan_results_id_seq', 2, true);


--
-- TOC entry 5114 (class 0 OID 0)
-- Dependencies: 223
-- Name: scans_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.scans_id_seq', 1, true);


--
-- TOC entry 5115 (class 0 OID 0)
-- Dependencies: 221
-- Name: traffic_logs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.traffic_logs_id_seq', 1, false);


--
-- TOC entry 5116 (class 0 OID 0)
-- Dependencies: 219
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 2, true);


--
-- TOC entry 5117 (class 0 OID 0)
-- Dependencies: 225
-- Name: vulnerabilities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.vulnerabilities_id_seq', 2, true);


--
-- TOC entry 4914 (class 2606 OID 33953)
-- Name: ai_predictions ai_predictions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ai_predictions
    ADD CONSTRAINT ai_predictions_pkey PRIMARY KEY (id);


--
-- TOC entry 4921 (class 2606 OID 33992)
-- Name: reports reports_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reports
    ADD CONSTRAINT reports_pkey PRIMARY KEY (id);


--
-- TOC entry 4923 (class 2606 OID 33994)
-- Name: reports reports_scan_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reports
    ADD CONSTRAINT reports_scan_id_key UNIQUE (scan_id);


--
-- TOC entry 4918 (class 2606 OID 33974)
-- Name: risk_scores risk_scores_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.risk_scores
    ADD CONSTRAINT risk_scores_pkey PRIMARY KEY (id);


--
-- TOC entry 4927 (class 2606 OID 34014)
-- Name: scan_results scan_results_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.scan_results
    ADD CONSTRAINT scan_results_pkey PRIMARY KEY (id);


--
-- TOC entry 4909 (class 2606 OID 33912)
-- Name: scans scans_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.scans
    ADD CONSTRAINT scans_pkey PRIMARY KEY (id);


--
-- TOC entry 4906 (class 2606 OID 33897)
-- Name: traffic_logs traffic_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.traffic_logs
    ADD CONSTRAINT traffic_logs_pkey PRIMARY KEY (id);


--
-- TOC entry 4903 (class 2606 OID 33882)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4912 (class 2606 OID 33933)
-- Name: vulnerabilities vulnerabilities_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vulnerabilities
    ADD CONSTRAINT vulnerabilities_pkey PRIMARY KEY (id);


--
-- TOC entry 4915 (class 1259 OID 33959)
-- Name: ix_ai_predictions_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_ai_predictions_id ON public.ai_predictions USING btree (id);


--
-- TOC entry 4919 (class 1259 OID 34000)
-- Name: ix_reports_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_reports_id ON public.reports USING btree (id);


--
-- TOC entry 4916 (class 1259 OID 33980)
-- Name: ix_risk_scores_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_risk_scores_id ON public.risk_scores USING btree (id);


--
-- TOC entry 4924 (class 1259 OID 34021)
-- Name: ix_scan_results_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_scan_results_id ON public.scan_results USING btree (id);


--
-- TOC entry 4925 (class 1259 OID 34020)
-- Name: ix_scan_results_scan_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_scan_results_scan_id ON public.scan_results USING btree (scan_id);


--
-- TOC entry 4907 (class 1259 OID 33918)
-- Name: ix_scans_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_scans_id ON public.scans USING btree (id);


--
-- TOC entry 4904 (class 1259 OID 33898)
-- Name: ix_traffic_logs_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_traffic_logs_id ON public.traffic_logs USING btree (id);


--
-- TOC entry 4899 (class 1259 OID 33884)
-- Name: ix_users_email; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX ix_users_email ON public.users USING btree (email);


--
-- TOC entry 4900 (class 1259 OID 33885)
-- Name: ix_users_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_users_id ON public.users USING btree (id);


--
-- TOC entry 4901 (class 1259 OID 33883)
-- Name: ix_users_username; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX ix_users_username ON public.users USING btree (username);


--
-- TOC entry 4910 (class 1259 OID 33939)
-- Name: ix_vulnerabilities_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_vulnerabilities_id ON public.vulnerabilities USING btree (id);


--
-- TOC entry 4930 (class 2606 OID 33954)
-- Name: ai_predictions ai_predictions_scan_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ai_predictions
    ADD CONSTRAINT ai_predictions_scan_id_fkey FOREIGN KEY (scan_id) REFERENCES public.scans(id);


--
-- TOC entry 4932 (class 2606 OID 33995)
-- Name: reports reports_scan_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reports
    ADD CONSTRAINT reports_scan_id_fkey FOREIGN KEY (scan_id) REFERENCES public.scans(id);


--
-- TOC entry 4931 (class 2606 OID 33975)
-- Name: risk_scores risk_scores_scan_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.risk_scores
    ADD CONSTRAINT risk_scores_scan_id_fkey FOREIGN KEY (scan_id) REFERENCES public.scans(id);


--
-- TOC entry 4933 (class 2606 OID 34015)
-- Name: scan_results scan_results_scan_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.scan_results
    ADD CONSTRAINT scan_results_scan_id_fkey FOREIGN KEY (scan_id) REFERENCES public.scans(id);


--
-- TOC entry 4928 (class 2606 OID 33913)
-- Name: scans scans_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.scans
    ADD CONSTRAINT scans_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 4929 (class 2606 OID 33934)
-- Name: vulnerabilities vulnerabilities_scan_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vulnerabilities
    ADD CONSTRAINT vulnerabilities_scan_id_fkey FOREIGN KEY (scan_id) REFERENCES public.scans(id);


-- Completed on 2026-08-26 16:57:10

--
-- PostgreSQL database dump complete
--

\unrestrict lUE8bKv5m79a7E3hHLYrZiAr6aXp0sPplZwvtdmPUqd9wiqGs1UXsE3TRUMhzZk

