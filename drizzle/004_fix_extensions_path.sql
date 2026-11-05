
-- Fix search_path for functions that use pgcrypto (crypt, gen_salt, digest, gen_random_bytes)
-- These functions are in the 'extensions' schema in Supabase.

ALTER FUNCTION login_user(text, text) SET search_path = public, extensions;
ALTER FUNCTION register_student(text, text, text) SET search_path = public, extensions;
ALTER FUNCTION change_password(uuid, text, text) SET search_path = public, extensions;
ALTER FUNCTION request_password_reset(text) SET search_path = public, extensions;
ALTER FUNCTION reset_password(text, text) SET search_path = public, extensions;
ALTER FUNCTION create_user_invite(text) SET search_path = public, extensions;
ALTER FUNCTION accept_user_invite(text, text, text) SET search_path = public, extensions;
