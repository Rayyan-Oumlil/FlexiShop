-- ============================================
-- SCRIPT DE NETTOYAGE ET SYNCHRONISATION USERS
-- ============================================

-- 1. Supprimer l'utilisateur rayyanoumlil@gmail.com de users_auth
DELETE FROM users_auth WHERE email = 'rayyanoumlil@gmail.com';

-- 2. Créer une fonction pour gérer la suppression automatique
CREATE OR REPLACE FUNCTION handle_auth_user_deleted()
RETURNS TRIGGER AS $$
BEGIN
    -- Supprimer de users_auth quand l'utilisateur est supprimé de auth.users
    DELETE FROM users_auth WHERE id = OLD.id;
    RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Créer le trigger de suppression automatique
DROP TRIGGER IF EXISTS on_auth_user_deleted ON auth.users;
CREATE TRIGGER on_auth_user_deleted
    AFTER DELETE ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION handle_auth_user_deleted();

-- 4. Nettoyer tous les utilisateurs orphelins (qui n'existent plus dans auth.users)
DELETE FROM users_auth WHERE id NOT IN (SELECT id FROM auth.users);

-- 5. Vérifier le résultat
SELECT 'users_auth count:' as info, count(*) as count FROM users_auth;
SELECT 'auth.users count:' as info, count(*) as count FROM auth.users;

-- 6. Afficher les utilisateurs restants
SELECT id, email, full_name, created_at FROM users_auth ORDER BY created_at DESC;
