PGDMP                          x           disertatiev2    11.7    11.7     T           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                       false            U           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                       false            V           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                       false            W           1262    16531    disertatiev2    DATABASE     j   CREATE DATABASE disertatiev2 WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C' LC_CTYPE = 'C';
    DROP DATABASE disertatiev2;
             postgres    false            �            1259    16555    groups    TABLE     S   CREATE TABLE public.groups (
    group_id integer NOT NULL,
    group_name text
);
    DROP TABLE public.groups;
       public         postgres    false            �            1259    16553    groups_group_id_seq    SEQUENCE     �   CREATE SEQUENCE public.groups_group_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.groups_group_id_seq;
       public       postgres    false    199            X           0    0    groups_group_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.groups_group_id_seq OWNED BY public.groups.group_id;
            public       postgres    false    198            �            1259    24766 	   locations    TABLE     �   CREATE TABLE public.locations (
    location_id integer NOT NULL,
    user_id integer NOT NULL,
    latitude double precision,
    longitude double precision,
    group_id integer
);
    DROP TABLE public.locations;
       public         postgres    false            �            1259    24764    locations_location_id_seq    SEQUENCE     �   CREATE SEQUENCE public.locations_location_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.locations_location_id_seq;
       public       postgres    false    201            Y           0    0    locations_location_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.locations_location_id_seq OWNED BY public.locations.location_id;
            public       postgres    false    200            �            1259    16534    users    TABLE     t   CREATE TABLE public.users (
    user_id integer NOT NULL,
    group_id integer,
    mail text,
    password text
);
    DROP TABLE public.users;
       public         postgres    false            �            1259    16532    users_user_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.users_user_id_seq;
       public       postgres    false    197            Z           0    0    users_user_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;
            public       postgres    false    196            �           2604    16558    groups group_id    DEFAULT     r   ALTER TABLE ONLY public.groups ALTER COLUMN group_id SET DEFAULT nextval('public.groups_group_id_seq'::regclass);
 >   ALTER TABLE public.groups ALTER COLUMN group_id DROP DEFAULT;
       public       postgres    false    198    199    199            �           2604    24769    locations location_id    DEFAULT     ~   ALTER TABLE ONLY public.locations ALTER COLUMN location_id SET DEFAULT nextval('public.locations_location_id_seq'::regclass);
 D   ALTER TABLE public.locations ALTER COLUMN location_id DROP DEFAULT;
       public       postgres    false    200    201    201            �           2604    16537    users user_id    DEFAULT     n   ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);
 <   ALTER TABLE public.users ALTER COLUMN user_id DROP DEFAULT;
       public       postgres    false    197    196    197            O          0    16555    groups 
   TABLE DATA               6   COPY public.groups (group_id, group_name) FROM stdin;
    public       postgres    false    199          Q          0    24766 	   locations 
   TABLE DATA               X   COPY public.locations (location_id, user_id, latitude, longitude, group_id) FROM stdin;
    public       postgres    false    201   �       M          0    16534    users 
   TABLE DATA               B   COPY public.users (user_id, group_id, mail, password) FROM stdin;
    public       postgres    false    197          [           0    0    groups_group_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.groups_group_id_seq', 23, true);
            public       postgres    false    198            \           0    0    locations_location_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.locations_location_id_seq', 8, true);
            public       postgres    false    200            ]           0    0    users_user_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.users_user_id_seq', 36, true);
            public       postgres    false    196            �           2606    16560    groups groups_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.groups
    ADD CONSTRAINT groups_pkey PRIMARY KEY (group_id);
 <   ALTER TABLE ONLY public.groups DROP CONSTRAINT groups_pkey;
       public         postgres    false    199            �           2606    24771    locations locations_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.locations
    ADD CONSTRAINT locations_pkey PRIMARY KEY (location_id);
 B   ALTER TABLE ONLY public.locations DROP CONSTRAINT locations_pkey;
       public         postgres    false    201            �           2606    16539    users users_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public         postgres    false    197            �           2606    16561    users group_id    FK CONSTRAINT        ALTER TABLE ONLY public.users
    ADD CONSTRAINT group_id FOREIGN KEY (group_id) REFERENCES public.groups(group_id) NOT VALID;
 8   ALTER TABLE ONLY public.users DROP CONSTRAINT group_id;
       public       postgres    false    3022    197    199            �           2606    24772    locations user_id    FK CONSTRAINT     u   ALTER TABLE ONLY public.locations
    ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public.users(user_id);
 ;   ALTER TABLE ONLY public.locations DROP CONSTRAINT user_id;
       public       postgres    false    197    3020    201            O   �   x�EOI
�0<kS*�َ�C���@ZJ�B�yI���3�IV/0�aS�#$>z*�hi��M˼�����,+�Rw�v�2I�%����lw5��'$'p���V���]y�>��k(���SO8�u��ON_���x� �oQt      Q   d   x�M��1г��z������Ɵ$�7�(jE�)h��\^�4�5v8��ڿ�<����P�0�_�b�=v�����x���π�}?<�t��d��Z?�$!      M   T   x�36�4�,I-.�T1JR1�P��q+r��H��L��5H6�H*��/�6O�O�����)O���J�Lvs��u�rM.+����� b�%     